// export interface dataTableModel {
//     Name: string;
//     Publisher: string;
//     Version: string;
//     SoftwareGuid: string;
//     LicensingType: string;
//     SoftwareType: string;
//     SoftwarePackageGuid: string;
//     DetectionDate: string;
//     InstallationDate: string;
//     SupportExpirationDate: string;
//     SupportIsExpired: string;
//     InstallationPath: string;
//     DeviceId: string;
//     SourceId: string;
// }

export interface fetchDataModelTableObject {
    guid: string;
    name: string;
    dataModelObjectGuid: string;
    dataModelPropertyGuid: string;
}

export interface fetchDataModelTableBody {
    properties: fetchDataModelTableObject[];
}

export interface dataModelTableObject {
    _loc_Report_Name: string;
    _loc_Report_IpAddress: string;
    _loc_Report_AgentStatus: string;
    _loc_Report_MacAddress: string | null;
    _loc_Report_Manufacturer: string | null;
    _loc_Report_OS: string | null;
}
