import { TribeServiceTest } from "./mock-data/TribeServiceTest";

describe("Test mock validate Repositories", () => {
  it("Should Tribe doesn't has covered", async () => {
    let ser = new TribeServiceTest();
    let resp1 = await ser.findRepositoriesByTribeTest(1);
    expect(resp1).toStrictEqual({
      error:
        "La Tribu no tiene repositorios que cumplan con la cobertura necesaria",
    });
  });

  it("Should Tribe doesn't exist", async () => {
    let ser = new TribeServiceTest();
    let resp1 = await ser.findRepositoriesByTribeTest(3);
    expect(resp1).toStrictEqual({
      error: "La Tribu no se encuentra registrada",
    });
  });

  it("Should list of repositories", async () => {
    let ser = new TribeServiceTest();
    let resp1 = await ser.findRepositoriesByTribeTest(2);
    expect(resp1).toStrictEqual([
      {
        id: "3",
        name: "cd-common-custom",
        tribe: "Centro Digital",
        organization: "Banco Pichincha",
        state: "Habilitado",
        coverage: "76%",
        codeSmells: 1,
        bugs: 0,
        vulnerabilities: 2,
        hotspots: 0,
        verificationState: "Aprobado",
      },
    ]);
  });
});
