import { Tribe } from "../../models/db/entities";

export const data: Tribe[] = [
  {
    _id: 1,
    name: "Centro Digital",
    status: 1,
    organization: { _id: 1, name: "Banco Pichincha", status: 1 },
    repositories: [
      {
        _id: 1,
        name: "cd-common-utils",
        state: "E",
        status: "A",
        created_at: new Date("2023-09-08T02:39:38.401Z"),
        metric: {
          _id: 1,
          coverage: 35,
          bugs: 0,
          vulnerabilities: 0,
          hostpot: 0,
          code_smells: 0,
          repository: 1,
        },
        tribe: {
          _id: 1,
        } as Tribe,
      },
      {
        _id: 2,
        name: "cd-common-text",
        state: "A",
        status: "A",
        created_at: new Date("2023-09-08T02:39:38.839Z"),
        metric: {
          _id: 2,
          coverage: 75,
          bugs: 0,
          vulnerabilities: 2,
          hostpot: 0,
          code_smells: 1,
          repository: 2,
        },
        tribe: {
          _id: 1,
        } as Tribe,
      },
    ],
  },
  {
    _id: 2,
    name: "Centro Digital",
    status: 1,
    organization: { _id: 1, name: "Banco Pichincha", status: 1 },
    repositories: [
      {
        _id: 3,
        name: "cd-common-custom",
        state: "E",
        status: "A",
        created_at: new Date("2023-09-08T02:39:38.839Z"),
        metric: {
          _id: 2,
          coverage: 76,
          bugs: 0,
          vulnerabilities: 2,
          hostpot: 0,
          code_smells: 1,
          repository: 2,
        },
        tribe: {
          _id: 1,
        } as Tribe,
      },
    ],
  },
];
