describe("Test Jest", () => {
  test("Validando Prueba Unitaria", () => {
    const expected = "Hola Mundo";
    const result = "Hola Mundo";
    expect(result).toStrictEqual(expected);
  });
});
