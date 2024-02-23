import isValidPrinter from "../utils/windows-printer-valid";
import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";
import { Printer } from "..";
import { spawn } from "child_process";

function stdoutHandler(stdout: string) {
  const printers: Printer[] = [];

  stdout
    .split(/(\r?\n){2,}/)
    .map((printer) => printer.trim())
    .filter((printer) => !!printer)
    .forEach((printer) => {
      const { isValid, printerData } = isValidPrinter(printer);

      if (!isValid) return;

      printers.push(printerData);
    });

  return printers;
}

async function getPrinters(): Promise<Printer[]> {
  try {
    throwIfUnsupportedOperatingSystem();
    let stdoutChunks: Array<any> = [],
      stderrChunks: Array<any> = [];
    return new Promise((resolve, reject) => {
      const process = spawn(
        "chcp 65001 >NUL & powershell.exe -NonInteractive -NoProfile -Command Get-CimInstance Win32_Printer -Property DeviceID,Name,PrinterPaperNames\n",
        { shell: true },
      );
      process.on("exit", (code) => reject("Process exited with code: " + code));
      process.stdout.on(
        "data",
        (data) => (stdoutChunks = stdoutChunks.concat(data)),
      );
      process.stderr.on(
        "data",
        (data) => (stderrChunks = stderrChunks.concat(data)),
      );
      process.stdout.on("end", () => {
        if (stdoutChunks.length > 0) {
          const stdoutContent = Buffer.concat(stdoutChunks).toString();
          resolve(stdoutHandler(stdoutContent));
        }
      });
      process.stderr.on("end", () => {
        if (stderrChunks.length > 0) {
          const stderrtContent = Buffer.concat(stderrChunks).toString();
          reject(stdoutHandler(stderrtContent));
        }
      });
    });
  } catch (error) {
    throw error;
  }
}

export default getPrinters;
