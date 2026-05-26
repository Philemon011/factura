"use server"

import { transporter } from "@/lib/mailer"
import { createClient } from "@/lib/supabase/server"
import { getInvoice } from "@/actions/invoices"
import { getClients } from "@/actions/clients"
import { getCompany } from "@/actions/company"

function formatCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString))
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: "Brouillon",
    sent: "Envoyée",
    paid: "Payée",
    overdue: "En retard",
  }
  return labels[status] || status
}

export async function sendInvoiceEmail(invoiceId: string): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Non authentifié")

  const [invoice, clients, company] = await Promise.all([
    getInvoice(invoiceId),
    getClients(),
    getCompany(),
  ])

  if (!invoice) throw new Error("Facture introuvable")

  const client = clients.find((c) => c.id === invoice.clientId)
  if (!client?.email) throw new Error("Email du client introuvable")

  const itemsRows = invoice.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f4f4f5;font-size:13px;color:#18181b;">${item.name}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f4f4f5;font-size:13px;color:#71717a;text-align:center;">${item.quantity}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f4f4f5;font-size:13px;color:#71717a;text-align:center;">${item.taxRate}%</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f4f4f5;font-size:13px;color:#18181b;text-align:right;font-weight:500;">${formatCFA(item.quantity * item.unitPrice)}</td>
      </tr>
    `
    )
    .join("")

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Facture ${invoice.number}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#18181b;border-radius:16px 16px 0 0;padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">factura</span>
                    <span style="font-size:10px;color:#71717a;display:block;margin-top:2px;">africa</span>
                  </td>
                  <td align="right">
                    <span style="background:#27272a;color:#a1a1aa;font-size:11px;padding:4px 12px;border-radius:20px;">
                      ${getStatusLabel(invoice.status)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:32px;">

              <!-- Titre -->
              <h1 style="margin:0 0 4px;font-size:28px;font-weight:700;color:#18181b;letter-spacing:-0.5px;">
                FACTURE
              </h1>
              <p style="margin:0 0 28px;font-size:13px;color:#a1a1aa;">N° ${invoice.number}</p>

              <!-- Émetteur / Client -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="vertical-align:top;padding-right:16px;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Émetteur</p>
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#18181b;">${company.name}</p>
                    <p style="margin:0 0 1px;font-size:12px;color:#71717a;">${company.email}</p>
                    <p style="margin:0 0 1px;font-size:12px;color:#71717a;">${company.phone}</p>
                    <p style="margin:0;font-size:12px;color:#71717a;">${company.address}</p>
                  </td>
                  <td width="50%" style="vertical-align:top;padding-left:16px;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Client</p>
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#18181b;">${client.name}</p>
                    <p style="margin:0 0 1px;font-size:12px;color:#71717a;">${client.email}</p>
                    <p style="margin:0 0 1px;font-size:12px;color:#71717a;">${client.phone}</p>
                    <p style="margin:0;font-size:12px;color:#71717a;">${client.address}</p>
                  </td>
                </tr>
              </table>

              <!-- Dates -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#f4f4f5;border-radius:10px;padding:14px 16px;">
                <tr>
                  <td width="50%">
                    <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Date d'émission</p>
                    <p style="margin:0;font-size:13px;font-weight:600;color:#18181b;">${formatDate(invoice.issueDate)}</p>
                  </td>
                  <td width="50%">
                    <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Date d'échéance</p>
                    <p style="margin:0;font-size:13px;font-weight:600;color:#18181b;">${formatDate(invoice.dueDate)}</p>
                  </td>
                </tr>
              </table>

              <!-- Tableau articles -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;border-radius:10px;overflow:hidden;border:1px solid #f4f4f5;">
                <thead>
                  <tr style="background:#f4f4f5;">
                    <th style="padding:10px 12px;text-align:left;font-size:10px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.5px;">Article</th>
                    <th style="padding:10px 12px;text-align:center;font-size:10px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.5px;">Qté</th>
                    <th style="padding:10px 12px;text-align:center;font-size:10px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.5px;">TVA</th>
                    <th style="padding:10px 12px;text-align:right;font-size:10px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.5px;">Montant HT</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
              </table>

              <!-- Totaux -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="60%"></td>
                  <td width="40%">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 0;font-size:12px;color:#71717a;">Sous-total HT</td>
                        <td style="padding:4px 0;font-size:12px;color:#18181b;text-align:right;">${formatCFA(invoice.subtotal)}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:12px;color:#71717a;">TVA (18%)</td>
                        <td style="padding:4px 0;font-size:12px;color:#18181b;text-align:right;">${formatCFA(invoice.taxAmount)}</td>
                      </tr>
                      ${invoice.discount > 0 ? `
                      <tr>
                        <td style="padding:4px 0;font-size:12px;color:#ef4444;">Remise</td>
                        <td style="padding:4px 0;font-size:12px;color:#ef4444;text-align:right;">- ${formatCFA(invoice.discount)}</td>
                      </tr>` : ""}
                      <tr>
                        <td colspan="2" style="padding:8px 0 0;border-top:1px solid #e4e4e7;"></td>
                      </tr>
                      <tr>
                        <td style="padding:0;font-size:14px;font-weight:700;color:#18181b;">Total TTC</td>
                        <td style="padding:0;font-size:14px;font-weight:700;color:#18181b;text-align:right;">${formatCFA(invoice.total)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${invoice.notes ? `
              <!-- Notes -->
              <div style="background:#f4f4f5;border-radius:8px;padding:12px 14px;margin-bottom:24px;">
                <p style="margin:0;font-size:12px;color:#71717a;line-height:1.6;">${invoice.notes}</p>
              </div>` : ""}

              <!-- CTA -->
              <div style="text-align:center;margin-top:8px;">
                <p style="margin:0;font-size:13px;color:#71717a;">
                  Merci pour votre confiance. Pour toute question, contactez-nous à
                  <a href="mailto:${company.email}" style="color:#18181b;font-weight:600;">${company.email}</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f4f5;border-radius:0 0 16px 16px;padding:16px 32px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#a1a1aa;">
                ${company.name} · Factura Africa · ${invoice.number}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  await transporter.sendMail({
    from: `"${company.name}" <${process.env.SMTP_FROM}>`,
    to: client.email,
    subject: `Facture ${invoice.number} — ${company.name}`,
    html,
  })

  // Mettre à jour le statut en "sent" si brouillon
  if (invoice.status === "draft") {
    await supabase
      .from("invoices")
      .update({ status: "sent" })
      .eq("id", invoiceId)
      .eq("user_id", user.id)
  }
}