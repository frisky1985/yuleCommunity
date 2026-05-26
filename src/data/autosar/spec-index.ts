import type { AutosarModule, AutosarLayer, AutosarVersion, ApiIndexEntry, AutosarApi } from './types';
import { CAN_APIS } from './can-spec';

export const SPEC_VERSIONS: AutosarVersion[] = [
  { id: '4.4', label: 'AUTOSAR 4.4', releaseDate: '2020-12', status: 'active' },
  { id: '4.6', label: 'AUTOSAR 4.6', releaseDate: '2022-06', status: 'active' },
  { id: 'R21-11', label: 'AUTOSAR R21-11', releaseDate: '2023-11', status: 'active' },
];

export const LAYERS: { id: string; name: string; description: string; color: string }[] = [
  { id: 'MCAL', name: 'MCAL', description: '微控制器驱动层 - 直接操作硬件寄存器', color: 'blue' },
  { id: 'ECUAL', name: 'ECUAL', description: 'ECU 抽象层 - 硬件无关的封装接口', color: 'cyan' },
  { id: 'Service', name: 'Service', description: '服务层 - 系统级服务与管理', color: 'teal' },
  { id: 'RTE_ASW', name: 'RTE + ASW', description: '运行时环境与应用层', color: 'emerald' },
];

// Demo-mode: we load all module specs here. For full prod, each module goes in its own file
function getModuleApis(moduleId: string): AutosarApi[] {
  const registry: Record<string, AutosarApi[]> = {
    Can: CAN_APIS,
  };
  return registry[moduleId] || [];
}

export function getAllModules(): AutosarModule[] {
  return [
    {
      id: 'Can', name: 'Can', layer: 'MCAL',
      description: 'CAN 通信驱动，支持 CAN 2.0B 和 CAN-FD，提供消息发送、接收、波特率配置等功能',
      versionIntroduced: '4.0',
      apis: getModuleApis('Can'),
    },
    {
      id: 'Dio', name: 'Dio', layer: 'MCAL',
      description: '数字 I/O 驱动，提供引脚电平的读写和翻转操作',
      versionIntroduced: '4.0',
      apis: getModuleApis('Dio'),
    },
    {
      id: 'Port', name: 'Port', layer: 'MCAL',
      description: '端口驱动，配置引脚功能复用和方向',
      versionIntroduced: '4.0',
      apis: getModuleApis('Port'),
    },
    {
      id: 'Mcu', name: 'Mcu', layer: 'MCAL',
      description: '微控制器驱动，负责时钟、复位和功耗管理',
      versionIntroduced: '4.0',
      apis: getModuleApis('Mcu'),
    },
    {
      id: 'Spi', name: 'Spi', layer: 'MCAL',
      description: 'SPI 通信驱动，支持主从模式和数据传输',
      versionIntroduced: '4.0',
      apis: getModuleApis('Spi'),
    },
    {
      id: 'Com', name: 'Com', layer: 'ECUAL',
      description: '信号级通信模块，提供信号打包/解包和路由',
      versionIntroduced: '4.0',
      apis: getModuleApis('Com'),
    },
    {
      id: 'PduR', name: 'PduR', layer: 'ECUAL',
      description: 'PDU 路由器，实现 PDU 路由和网关功能',
      versionIntroduced: '4.0',
      apis: getModuleApis('PduR'),
    },
    {
      id: 'NvM', name: 'NvM', layer: 'Service',
      description: '非易失性存储器管理，提供数据持久化服务',
      versionIntroduced: '4.0',
      apis: getModuleApis('NvM'),
    },
    {
      id: 'EcuM', name: 'EcuM', layer: 'Service',
      description: 'ECU 状态管理，控制 ECU 启动/关闭和功耗模式',
      versionIntroduced: '4.0',
      apis: getModuleApis('EcuM'),
    },
    {
      id: 'Rte', name: 'Rte', layer: 'RTE_ASW',
      description: '运行时环境，连接应用层与 BSW 的通信桥梁',
      versionIntroduced: '4.0',
      apis: getModuleApis('Rte'),
    },
  ];
}

export function getLayers(): AutosarLayer[] {
  const modules = getAllModules();
  const layerMap: Record<string, AutosarModule[]> = {};
  for (const mod of modules) {
    if (!layerMap[mod.layer]) layerMap[mod.layer] = [];
    layerMap[mod.layer].push(mod);
  }
  return LAYERS.map(l => ({
    id: l.id as AutosarLayer['id'],
    name: l.name,
    modules: layerMap[l.id] || [],
  }));
}

export function buildSearchIndex(): ApiIndexEntry[] {
  const entries: ApiIndexEntry[] = [];
  for (const mod of getAllModules()) {
    for (const api of mod.apis) {
      entries.push({
        id: api.id,
        name: api.name,
        signature: api.signature,
        moduleId: api.moduleId,
        layerId: api.layerId,
        brief: api.brief,
      });
    }
  }
  return entries;
}

export function findApiById(apiId: string): AutosarApi | undefined {
  for (const mod of getAllModules()) {
    for (const api of mod.apis) {
      if (api.id === apiId) return api;
    }
  }
  return undefined;
}

export function findModuleById(moduleId: string): AutosarModule | undefined {
  return getAllModules().find(m => m.id === moduleId);
}

export function getModuleIndex(): { id: string; name: string; layer: string; apiCount: number }[] {
  return getAllModules().map(m => ({
    id: m.id, name: m.name, layer: m.layer, apiCount: m.apis.length,
  }));
}
