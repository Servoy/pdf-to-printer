import execFileAsync from "../utils/exec-file-async";
import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";
import isValidPrinter from "../utils/windows-printer-valid";
import { Printer } from "..";
import { get } from "../get-printers/get-printers";

async function getDefaultPrinter(): Promise<Printer | null> {
  try {
    throwIfUnsupportedOperatingSystem();
    return get(
      `Get-CimInstance Win32_Printer -Property DeviceID,Name,PrinterPaperNames -Filter Default=true`,
    ).then((printers) => printers[0]);
  } catch (error) {
    throw error;
  }
}

export default getDefaultPrinter;
