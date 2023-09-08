export interface ICustomQueryDTO extends ICustomQueryMetricDTO {
  id: string;
  name: string;
  tribe: string;
  organization: string;
  state: string;
}

export interface ICustomQueryMetricDTO {
  coverage?: string;
  codeSmells?: number;
  bugs?: number;
  vulnerabilities?: number;
  hotspots?: number;
  verificationState?: string;
}

export interface IResponseMetricDTO extends ICustomQueryMetricDTO {
  coverage_number: number;
}
