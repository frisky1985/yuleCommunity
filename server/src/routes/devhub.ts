/**
 * DevHub 数据 API 路由
 * AutoSAR 规范数据、模块注册表数据
 *
 * GET /api/devhub/specs          — 获取规范索引
 * GET /api/devhub/specs/:module  — 获取某模块详细规范
 * GET /api/devhub/registry       — 获取模块注册表列表
 * GET /api/devhub/registry/:id   — 获取注册模块详情
 */
import { Router } from 'express';
import { store } from '../services/storage.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.use(optionalAuth);

// GET /api/devhub/specs — 获取规范索引（直接返回已有前端数据格式的映射）
router.get('/specs', (_req, res) => {
  // 返回模块列表和层级，与实际前端数据对应
  const specsIndex = {
    layers: [
      {
        id: 'mcal',
        name: 'MCAL',
        description: '微控制器抽象层',
        modules: [
          { id: 'can', name: 'CAN', description: 'CAN 控制器驱动' },
          { id: 'dio', name: 'DIO', description: '数字 I/O' },
          { id: 'port', name: 'Port', description: '端口引脚配置' },
          { id: 'mcu', name: 'MCU', description: '微控制器单元' },
          { id: 'spi', name: 'SPI', description: 'SPI 通信' },
        ],
      },
      {
        id: 'ecual',
        name: 'ECUAL',
        description: '外围设备抽象层',
        modules: [
          { id: 'canif', name: 'CanIf', description: 'CAN 接口' },
          { id: 'pdur', name: 'PduR', description: 'PDU 路由器' },
          { id: 'com', name: 'Com', description: '通信模块' },
          { id: 'ecum', name: 'EcuM', description: 'ECU 管理器' },
          { id: 'nvm', name: 'NvM', description: '非易失性存储器管理' },
        ],
      },
      {
        id: 'service',
        name: 'Service',
        description: '服务层',
        modules: [
          { id: 'os', name: 'OS', description: '操作系统' },
          { id: 'wdg', name: 'WDG', description: '看门狗' },
        ],
      },
      {
        id: 'rte_asw',
        name: 'RTE + ASW',
        description: '运行时环境和应用层',
        modules: [
          { id: 'rte', name: 'RTE', description: '运行时环境' },
        ],
      },
    ],
  };

  res.json({ success: true, data: specsIndex });
});

// GET /api/devhub/registry — 模块注册表列表
router.get('/registry', (_req, res) => {
  const data = store.get();

  // 检查是否有已发布的注册模块
  // 目前注册数据在前端示例文件中，API 返回基础列表
  const registryModules = [
    { id: 'can-stack', name: 'CAN Stack', layer: 'mcal', version: '2.1.0', downloads: 1450, rating: 4.5, mcu: ['TC397', 'S32K3'], status: 'stable', description: '完整 CAN 协议栈，支持 Classic CAN 和 CAN FD' },
    { id: 'dio-driver', name: 'DIO Driver', layer: 'mcal', version: '1.3.0', downloads: 2300, rating: 4.8, mcu: ['TC397', 'S32K3', 'RH850'], status: 'stable', description: '高性能数字 I/O 驱动，支持 PWM 输出' },
    { id: 'spi-driver', name: 'SPI Driver', layer: 'mcal', version: '2.0.0', downloads: 1800, rating: 4.6, mcu: ['TC397', 'S32K3', 'RH850'], status: 'stable', description: 'SPI 主从通信驱动，支持 DMA 模式' },
    { id: 'mcu-driver', name: 'MCU Driver', layer: 'mcal', version: '1.5.0', downloads: 3200, rating: 4.3, mcu: ['TC397', 'S32K3', 'Stellar'], status: 'stable', description: 'MCU 初始化、时钟配置和复位管理' },
    { id: 'os-kernel', name: 'OS Kernel', layer: 'service', version: '3.0.0', downloads: 980, rating: 4.2, mcu: ['TC397', 'S32K3'], status: 'beta', description: '轻量级 AutoSAR OS 内核实现' },
    { id: 'lin-stack', name: 'LIN Stack', layer: 'ecual', version: '1.1.0', downloads: 560, rating: 4.0, mcu: ['S32K3', 'RH850'], status: 'stable', description: 'LIN 总线协议栈，支持 Master/Slave 模式' },
    { id: 'soad-module', name: 'SoAd', layer: 'ecual', version: '2.0.0', downloads: 420, rating: 3.8, mcu: ['TC397', 'Stellar'], status: 'stable', description: 'Socket 适配器，支持 TCP/UDP 通信' },
    { id: 'wdg-driver', name: 'WDG Driver', layer: 'service', version: '1.2.0', downloads: 1500, rating: 4.7, mcu: ['TC397', 'S32K3', 'RH850'], status: 'stable', description: '看门狗驱动，支持内部/外部 WDG' },
    { id: 'pwm-driver', name: 'PWM Driver', layer: 'mcal', version: '1.4.0', downloads: 1100, rating: 4.4, mcu: ['TC397', 'S32K3'], status: 'stable', description: 'PWM 输出驱动，支持多通道频率/占空比配置' },
    { id: 'nvm-manager', name: 'NvM Manager', layer: 'ecual', version: '1.8.0', downloads: 780, rating: 4.1, mcu: ['TC397', 'S32K3', 'RH850'], status: 'stable', description: '非易失性存储器管理器' },
  ];

  res.json({ success: true, data: registryModules });
});

export default router;
