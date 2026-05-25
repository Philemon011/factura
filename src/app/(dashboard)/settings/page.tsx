import { getCompany } from "@/actions/company"
import SettingsClient from "@/components/settings/SettingsClient"

export default async function SettingsPage() {
  const company = await getCompany()
  return <SettingsClient initialCompany={company} />
}