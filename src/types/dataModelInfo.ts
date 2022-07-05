// import { dataModelObject } from './dataModelInfo';
// export interface dataModelObject {
//     Guid: string;
//     Name: string;
//     Description: string;
//     IsSystem: boolean;
//     IsAgent: boolean;
// }

// export interface dataModelInfo {
//     Guid: string;
//     Name: string;
//     Description: string;
//     Properties: dataModelObject[];
// }

interface scanConf {
    isEnabled: boolean;
    historyIsEnabled: boolean;
    scanInterval: number;
    description: boolean | null;
    wmiClass: boolean | null;
    sshCommand: boolean | null;
    sqlQuery: boolean | null;
}
export interface dataModelObjectProperties {
    guid: string;
    name: string;
    description: string;
    isSystem: boolean;
    isAgent: boolean;
}
export interface dataModelObject {
    guid: string;
    name: string;
    description: string;
    properties: dataModelObjectProperties[];
    scanConfig: scanConf;
}

export interface dataModel {
    guid: string;
    name: string;
    description: string | null;
    revision: number;
    objects: dataModelObject[];
    createdAt: string;
    updatedAt: string | null;
}
