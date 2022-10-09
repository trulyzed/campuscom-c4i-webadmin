import HelpConfig from "~/Help/helpConfig.json"

const helpConfig: { [key: string]: string } = HelpConfig

export const getHelpConfig = (helpKey?: string): Promise<string | undefined> => {
  if (!helpKey) return Promise.resolve(undefined)
  return Promise.resolve(helpConfig[helpKey])
}
