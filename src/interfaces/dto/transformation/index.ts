import { IOrganization, IOrganizationResultDTO } from "../../db/organization";

export const OrganizationToDto = (
  organization: IOrganization | null
): IOrganizationResultDTO | null => {
  if (organization) {
    const { _id, name, status, ...rest } = organization;
    return {
      _id,
      name,
      status,
    };
  }
  return null;
};
