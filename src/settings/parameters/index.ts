export const STATIC_FOLDER = "public";
export const MESSAGE_PORT_LISTEN = (port: string) =>
  `Escuchando puerto ${port}/`;
export const HOST = (hostname: string, port: string) => `${hostname}:${port}/`;

export const OK = Object.freeze({
  OK: true,
  MESSAGE: "Successful process",
});
