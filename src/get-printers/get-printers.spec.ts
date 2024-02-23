import { Printer } from "..";
import getPrinters from "./get-printers";

jest.mock("../utils/throw-if-unsupported-os");

const mockPrinterListStdout = `

Status                      :
Name                        : OneNote
Caption                     :
Description                 :
InstallDate                 :
DeviceID                    : OneNote
StartTime                   :
UntilTime                   :
WorkOffline                 :
PSComputerName              :
CimClass                    : root/cimv2:Win32_Printer
CimInstanceProperties       : {Caption, Description, InstallDate, Name...}
CimSystemProperties         : Microsoft.Management.Infrastructure.CimSystemProperties


Status                      :
Name                        : Microsoft XPS Document Writer
Caption                     :
Description                 :
InstallDate                 :
Availability                :
DeviceID                    : Microsoft-XPS-Document-Writer
CimClass                    : root/cimv2:Win32_Printer
CimInstanceProperties       : {Caption, Description, InstallDate, Name...}
CimSystemProperties         : Microsoft.Management.Infrastructure.CimSystemProperties


Status                      :
Name                        : Microsoft Print to PDF
Description                 :
DeviceID                    : Microsoft_Print_to_PDF
CimClass                    : root/cimv2:Win32_Printer
CimInstanceProperties       : {Caption, Description, InstallDate, Name...}
CimSystemProperties         : Microsoft.Management.Infrastructure.CimSystemProperties


Status                      :
Name                        : Fax
Description                 :
InstallDate                 :
DeviceID                    : Fax
CimClass                    : root/cimv2:Win32_Printer
CimInstanceProperties       : {Caption, Description, InstallDate, Name...}
CimSystemProperties         : Microsoft.Management.Infrastructure.CimSystemProperties

`;

it("returns list of available printers", async () => {
  const result: Printer[] = await getPrinters();

  expect(result).toBeDefined();
});
