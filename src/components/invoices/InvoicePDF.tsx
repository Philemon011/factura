import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"
import { Invoice, Client, Company } from "@/types"

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 48,
    backgroundColor: "#ffffff",
    color: "#18181b",
  },
  topBar: {
    height: 4,
    backgroundColor: "#18181b",
    borderRadius: 2,
    marginBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: "#18181b",
    letterSpacing: -0.5,
  },
  invoiceNumber: {
    fontSize: 10,
    color: "#a1a1aa",
    marginTop: 4,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: "#18181b",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
  },
  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  statusText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  partiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  partyBlock: {
    flex: 1,
  },
  partyLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#a1a1aa",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  partyName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#18181b",
    marginBottom: 2,
  },
  partyDetail: {
    fontSize: 9,
    color: "#71717a",
    marginBottom: 1,
  },
  datesRow: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 32,
  },
  dateBlock: {},
  dateLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#a1a1aa",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#18181b",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f4f4f5",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 2,
  },
  tableHeaderText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#71717a",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f4f4f5",
  },
  colName: { flex: 3 },
  colQty: { flex: 1, textAlign: "center" },
  colTax: { flex: 1, textAlign: "center" },
  colAmount: { flex: 2, textAlign: "right" },
  cellText: {
    fontSize: 9,
    color: "#18181b",
  },
  cellMuted: {
    fontSize: 9,
    color: "#71717a",
  },
  totalsSection: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  totalsBox: {
    width: 200,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  totalLabel: {
    fontSize: 9,
    color: "#71717a",
  },
  totalValue: {
    fontSize: 9,
    color: "#18181b",
  },
  totalDivider: {
    height: 0.5,
    backgroundColor: "#e4e4e7",
    marginVertical: 6,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  grandTotalLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#18181b",
  },
  grandTotalValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#18181b",
  },
  discountValue: {
    fontSize: 9,
    color: "#ef4444",
  },
  notesSection: {
    marginTop: 24,
    backgroundColor: "#f4f4f5",
    borderRadius: 6,
    padding: 10,
  },
  notesText: {
    fontSize: 8,
    color: "#71717a",
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 48,
    right: 48,
    borderTopWidth: 0.5,
    borderTopColor: "#f4f4f5",
    paddingTop: 8,
    alignItems: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#d4d4d8",
  },
})

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

function getStatusColors(status: string): { bg: string; text: string } {
  const colors: Record<string, { bg: string; text: string }> = {
    draft: { bg: "#f4f4f5", text: "#71717a" },
    sent: { bg: "#dbeafe", text: "#1d4ed8" },
    paid: { bg: "#dcfce7", text: "#15803d" },
    overdue: { bg: "#fee2e2", text: "#dc2626" },
  }
  return colors[status] || { bg: "#f4f4f5", text: "#71717a" }
}

interface InvoicePDFProps {
  invoice: Invoice
  client: Client | null
  company: Company
}

export default function InvoicePDF({ invoice, client, company }: InvoicePDFProps) {
  const statusColors = getStatusColors(invoice.status)

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Bande décorative */}
        <View style={styles.topBar} />

        {/* En-tête */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>FACTURE</Text>
            <Text style={styles.invoiceNumber}>N° {invoice.number}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>F</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
              <Text style={[styles.statusText, { color: statusColors.text }]}>
                {getStatusLabel(invoice.status)}
              </Text>
            </View>
          </View>
        </View>

        {/* Émetteur / Client */}
        <View style={styles.partiesRow}>
          <View style={styles.partyBlock}>
            <Text style={styles.partyLabel}>Émetteur</Text>
            <Text style={styles.partyName}>{company.name}</Text>
            <Text style={styles.partyDetail}>{company.email}</Text>
            <Text style={styles.partyDetail}>{company.phone}</Text>
            <Text style={styles.partyDetail}>{company.address}</Text>
            {company.taxId && (
              <Text style={styles.partyDetail}>IFU : {company.taxId}</Text>
            )}
          </View>
          <View style={styles.partyBlock}>
            <Text style={styles.partyLabel}>Client</Text>
            <Text style={styles.partyName}>{invoice.clientName}</Text>
            {client && (
              <>
                <Text style={styles.partyDetail}>{client.email}</Text>
                <Text style={styles.partyDetail}>{client.phone}</Text>
                <Text style={styles.partyDetail}>{client.address}</Text>
              </>
            )}
          </View>
        </View>

        {/* Dates */}
        <View style={styles.datesRow}>
          <View style={styles.dateBlock}>
            <Text style={styles.dateLabel}>Date d'émission</Text>
            <Text style={styles.dateValue}>{formatDate(invoice.issueDate)}</Text>
          </View>
          <View style={styles.dateBlock}>
            <Text style={styles.dateLabel}>Date d'échéance</Text>
            <Text style={styles.dateValue}>{formatDate(invoice.dueDate)}</Text>
          </View>
        </View>

        {/* Tableau articles */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colName]}>Article</Text>
          <Text style={[styles.tableHeaderText, styles.colQty]}>Qté</Text>
          <Text style={[styles.tableHeaderText, styles.colTax]}>TVA</Text>
          <Text style={[styles.tableHeaderText, styles.colAmount]}>Montant HT</Text>
        </View>

        {invoice.items.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.cellText, styles.colName]}>{item.name}</Text>
            <Text style={[styles.cellMuted, styles.colQty]}>{item.quantity}</Text>
            <Text style={[styles.cellMuted, styles.colTax]}>{item.taxRate}%</Text>
            <Text style={[styles.cellText, styles.colAmount]}>
              {formatCFA(item.quantity * item.unitPrice)}
            </Text>
          </View>
        ))}

        {/* Totaux */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Sous-total HT</Text>
              <Text style={styles.totalValue}>{formatCFA(invoice.subtotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TVA (18%)</Text>
              <Text style={styles.totalValue}>{formatCFA(invoice.taxAmount)}</Text>
            </View>
            {invoice.discount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Remise</Text>
                <Text style={styles.discountValue}>- {formatCFA(invoice.discount)}</Text>
              </View>
            )}
            <View style={styles.totalDivider} />
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total TTC</Text>
              <Text style={styles.grandTotalValue}>{formatCFA(invoice.total)}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Factura Africa — {invoice.number} — {company.name}
          </Text>
        </View>
      </Page>
    </Document>
  )
}