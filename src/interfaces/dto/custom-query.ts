export interface ICustomQueryDTO {
  id: string;
  name: string;
  tribe: string;
  organization: string;
  coverage?: string;
  codeSmells?: number;
  bugs?: number;
  vulnerabilities?: number;
  hotspots?: number;
  verificationState?: string;
  state: string;
}
