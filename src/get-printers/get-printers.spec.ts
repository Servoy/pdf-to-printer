import { Printer } from "..";
import getPrinters from "./get-printers";

it("returns list of available printers", async () => {
  const result: Printer[] = await getPrinters();

  expect(result).toBeDefined();
});
