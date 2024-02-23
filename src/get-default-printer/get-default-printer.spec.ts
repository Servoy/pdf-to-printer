import { Printer, getDefaultPrinter } from "..";

jest.mock("../utils/throw-if-unsupported-os");

it("gets the default printer with custom and repeated properties", async () => {
  const result: Printer | null = await getDefaultPrinter();
  console.log(result);
  expect(result).toBeDefined();
});
