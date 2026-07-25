import{j as e,m as v}from"./framer-motion-JoH0GZ7Q.js";import{r as p,l as z}from"./react-vendor-xnT7OPjt.js";import{H as $}from"./index-BwPx4mqM.js";import{D as K}from"./DevHubLayout-BQc4giSm.js";import{F}from"./index-Cm3cL4So.js";import{aj as G,b8 as Y,ad as q,_ as w,t as H,af as X,aZ as Q,av as J,V as L,S as Z,X as ee,z as W,Z as E,k as te}from"./ui-utils-CaBEDqaF.js";const j=[{id:"can-init-send",name:"CAN Init + Message Send",description:"Initialize CAN controller and send a standard CAN frame with 8-byte payload",category:"CAN",code:`/* CAN Init + Message Send Example */
#include "Std_Types.h"
#include "Can.h"

uint8 txData[8] = {0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88};

void main(void) {
    Can_ConfigType cfg;
    cfg.Controller.CanControllerId = 0;
    cfg.Controller.CanControllerBaudrate = 500000;
    cfg.Controller.CanControllerWakeupSource = CAN_WAKEUP_SOURCE_INTERNAL;

    Std_ReturnType ret = Can_Init(&cfg);
    if (ret != E_OK) {
        /* Error: CAN init failed */
        return;
    }

    Can_PduType pdu;
    pdu.id = 0x123;
    pdu.length = 8;
    pdu.sdu = txData;
    pdu.swPduHandle = NULL;

    ret = Can_Write(CAN_HTH_0, &pdu);
    if (ret == E_OK) {
        /* Message sent successfully */
    }
}`},{id:"can-receive",name:"CAN Message Receive",description:"Simulate receiving CAN messages and checking wakeup status",category:"CAN",code:`/* CAN Message Receive Example */
#include "Std_Types.h"
#include "Can.h"

void main(void) {
    Can_ConfigType cfg;
    cfg.Controller.CanControllerId = 0;
    cfg.Controller.CanControllerBaudrate = 500000;
    cfg.Controller.CanControllerWakeupSource = CAN_WAKEUP_SOURCE_INTERNAL;

    Can_Init(&cfg);

    /* Check if CAN bus woke up the system */
    if (Can_CheckWakeup(ECUM_WAKEUP_SOURCE_CAN) == E_OK) {
        /* Read received CAN message */
        Can_PduType rxPdu;
        uint8 rxBuffer[8];
        rxPdu.sdu = rxBuffer;
        rxPdu.length = 8;

        Can_Read(CAN_HRH_0, &rxPdu);

        /* Process received data */
        if (rxPdu.id == 0x100) {
            /* Handle specific CAN ID */
        }
    }
}`},{id:"dio-read-write",name:"DIO Read/Write/Flip",description:"Demonstrate digital I/O operations including read, write, and toggle functions",category:"DIO",code:`/* DIO Read/Write/Flip Example */
#include "Std_Types.h"
#include "Dio.h"

void main(void) {
    /* Write high to pin 0 */
    Dio_WriteChannel(DIO_PIN_0, DIO_HIGH);

    /* Write low to pin 1 */
    Dio_WriteChannel(DIO_PIN_1, DIO_LOW);

    /* Read back pin 0 */
    Dio_LevelType val = Dio_ReadChannel(DIO_PIN_0);

    /* Flip pin 2 (toggle) */
    Dio_LevelType flipped = Dio_FlipChannel(DIO_PIN_2);

    /* Write all pins on port A */
    Dio_WritePort(0, 0xAA);

    /* Read port A */
    Dio_LevelType portVal = 0;
    Dio_ReadPort(0, &portVal);

    /* Verify flips */
    Dio_FlipChannel(DIO_PIN_2);
    Dio_FlipChannel(DIO_PIN_2);
}`},{id:"dio-blink",name:"DIO Blink Pattern",description:"Simulate a blinking LED pattern using DIO flip operations with delay loop",category:"DIO",code:`/* DIO Blink Pattern Example */
#include "Std_Types.h"
#include "Dio.h"

void delay(volatile uint32 count) {
    while (count > 0) {
        count--;
    }
}

void main(void) {
    uint8 i;

    /* Blink LED on pin 0 five times */
    for (i = 0; i < 5; i++) {
        Dio_WriteChannel(DIO_PIN_0, DIO_HIGH);
        delay(10000);

        Dio_WriteChannel(DIO_PIN_0, DIO_LOW);
        delay(10000);
    }

    /* Blink pin 1 and 2 in alternating pattern */
    Dio_WriteChannel(DIO_PIN_1, DIO_HIGH);
    Dio_WriteChannel(DIO_PIN_2, DIO_LOW);
    delay(10000);

    Dio_WriteChannel(DIO_PIN_1, DIO_LOW);
    Dio_WriteChannel(DIO_PIN_2, DIO_HIGH);
    delay(10000);

    /* Use flip for half-speed blink on pin 3 */
    for (i = 0; i < 3; i++) {
        Dio_FlipChannel(DIO_PIN_3);
        delay(20000);
    }
}`},{id:"spi-exchange",name:"SPI Exchange Data",description:"Initialize SPI and demonstrate master-mode data exchange transaction",category:"SPI",code:`/* SPI Exchange Data Example */
#include "Std_Types.h"
#include "Spi.h"

uint8 txBuffer[4] = {0xAA, 0xBB, 0xCC, 0xDD};
uint8 rxBuffer[4] = {0};

void main(void) {
    Spi_ChannelConfigType cfg;
    cfg.Channel = 0;
    cfg.Baudrate = 8;
    cfg.DataWidth = 8;
    cfg.Mode = SPI_MODE_0;

    /* Initialize SPI */
    Spi_Init(&cfg);

    /* Write data to SPI channel */
    Std_ReturnType ret = Spi_WriteIB(0, txBuffer, 4);
    if (ret == E_OK) {
        /* Data written successfully */
    }

    /* Perform SPI exchange (simultaneous Tx/Rx) */
    ret = Spi_Exchange(0, txBuffer, rxBuffer, 4);
    if (ret == E_OK) {
        /* rxBuffer now contains received data */
    }

    /* Read back from SPI */
    ret = Spi_ReadIB(0, rxBuffer, 4);
}`},{id:"mcu-clock-config",name:"MCU Clock Configuration",description:"Configure MCU clock tree including HSI, PLL setup and reset management",category:"MCU",code:`/* MCU Clock Configuration Example */
#include "Std_Types.h"
#include "Mcu.h"

void main(void) {
    Mcu_ClockSettingType clockSettings[2];

    /* Configure HSI clock */
    clockSettings[0].ClockType = MCU_CLOCK_TYPE_HSI;
    clockSettings[0].Frequency = 8000000;
    clockSettings[0].SourceFrequency = 8000000;

    /* Configure PLL clock */
    clockSettings[1].ClockType = MCU_CLOCK_TYPE_PLL;
    clockSettings[1].Frequency = 72000000;
    clockSettings[1].SourceFrequency = 8000000;

    Mcu_ConfigType cfg;
    cfg.ClockSettings = clockSettings;
    cfg.ClockSettingCount = 2;
    cfg.PllConfig.PllMul = 9;
    cfg.PllConfig.PllDiv = 2;
    cfg.PllConfig.PllPreDiv = 1;

    /* Initialize MCU */
    Mcu_Init(&cfg);

    /* Switch to PLL clock */
    Std_ReturnType ret = Mcu_InitClock(MCU_CLOCK_TYPE_PLL);

    /* Get reset reason */
    Mcu_ResetType reason;
    Mcu_GetResetReason(&reason);

    if (reason == MCU_POWER_ON_RESET) {
        /* Handle power-on initialization */
    }

    /* Perform software reset */
    Mcu_PerformReset();
}`},{id:"nvm-read-write",name:"NvM Read/Write (Stub)",description:"Simulate NVRAM manager block read/write operations with virtual storage",category:"NvM",code:`/* NvM Read/Write Stub Example */
#include "Std_Types.h"

/* NvM Stub Types */
typedef uint16 NvM_BlockIdType;
#define NVM_BLOCK_ID_CALIBRATION 0x01
#define NVM_BLOCK_ID_CONFIG      0x02
#define NVM_REQUEST_OK           0
#define NVM_REQUEST_NOT_OK       1

/* NvM Stub Functions - Simulated implementations */
typedef uint8 NvM_RequestResultType;

static uint8 _sim_nvm_data[256] = {0};

NvM_RequestResultType NvM_ReadBlock(NvM_BlockIdType BlockId, void* Data) {
    if (BlockId > 1 || Data == NULL) return NVM_REQUEST_NOT_OK;
    uint8 i;
    uint8* dst = (uint8*)Data;
    uint16 offset = BlockId * 128;
    for (i = 0; i < 128; i++) {
        dst[i] = _sim_nvm_data[offset + i];
    }
    return NVM_REQUEST_OK;
}

NvM_RequestResultType NvM_WriteBlock(NvM_BlockIdType BlockId, const void* Data) {
    if (BlockId > 1 || Data == NULL) return NVM_REQUEST_NOT_OK;
    uint8 i;
    const uint8* src = (const uint8*)Data;
    uint16 offset = BlockId * 128;
    for (i = 0; i < 128; i++) {
        _sim_nvm_data[offset + i] = src[i];
    }
    return NVM_REQUEST_OK;
}

typedef struct {
    uint16 parameter1;
    uint8  parameter2;
    uint32 parameter3;
} CalibrationData;

void main(void) {
    CalibrationData calData;
    calData.parameter1 = 1000;
    calData.parameter2 = 50;
    calData.parameter3 = 0x12345678;

    /* Write calibration data to NvM */
    NvM_RequestResultType ret = NvM_WriteBlock(NVM_BLOCK_ID_CALIBRATION, &calData);

    /* Read back calibration data */
    CalibrationData readBack;
    ret = NvM_ReadBlock(NVM_BLOCK_ID_CALIBRATION, &readBack);
}`},{id:"can-dio-integration",name:"CAN + DIO Integration",description:"Use CAN messages to control DIO outputs - integrates two AutoSAR modules",category:"CAN",code:`/* CAN + DIO Integration Example */
#include "Std_Types.h"
#include "Can.h"
#include "Dio.h"

void main(void) {
    /* Initialize CAN */
    Can_ConfigType canCfg;
    canCfg.Controller.CanControllerId = 0;
    canCfg.Controller.CanControllerBaudrate = 500000;
    canCfg.Controller.CanControllerWakeupSource = CAN_WAKEUP_SOURCE_INTERNAL;
    Can_Init(&canCfg);

    /* Set initial DIO states */
    Dio_WriteChannel(DIO_PIN_0, DIO_LOW);
    Dio_WriteChannel(DIO_PIN_1, DIO_LOW);
    Dio_WriteChannel(DIO_PIN_2, DIO_LOW);

    /* Send command message to control DIO */
    uint8 cmdData[8] = {0};
    cmdData[0] = 0x01; /* Command: Set output */
    cmdData[1] = 0x00; /* Pin mask: bit0 = pin0, bit1 = pin1, etc. */
    cmdData[2] = 0x05; /* Pin values: bit0=1, bit2=1 */

    Can_PduType pdu;
    pdu.id = 0x200;
    pdu.length = 8;
    pdu.sdu = cmdData;
    pdu.swPduHandle = NULL;

    Can_Write(CAN_HTH_0, &pdu);

    /* Process command: set DIO according to CAN message */
    if (cmdData[0] == 0x01) {
        uint8 i;
        for (i = 0; i < 8; i++) {
            if (cmdData[1] & (1 << i)) {
                Dio_LevelType level = (cmdData[2] >> i) & 1;
                Dio_WriteChannel(i, level);
            }
        }
    }

    /* Read back and send status */
    uint8 statusData[8] = {0};
    uint8 j;
    for (j = 0; j < 4; j++) {
        statusData[j] = Dio_ReadChannel(j);
    }

    Can_PduType statusPdu;
    statusPdu.id = 0x201;
    statusPdu.length = 8;
    statusPdu.sdu = statusData;
    statusPdu.swPduHandle = NULL;

    Can_Write(CAN_HTH_0, &statusPdu);
}`}];function U(x){return j.find(s=>s.id===x)}function ne(){const x=Date.now();return{canMessages:[],gpioEvents:[],interrupts:[],logs:[],isRunning:!1,startTime:x,currentTime:x}}function ie(x){const s=ne(),i=[];let h=!1,I;try{const o=x.split(`
`);let n=!1,C=!1;const m=[];for(const _ of o){let t=_.trim();if(n)if(t.includes("*/"))t=t.substring(t.indexOf("*/")+2),n=!1;else continue;if(t.includes("/*")&&(t.includes("*/")?t=t.replace(/\/\*.*?\*\//g,"").trim():(n=!0,t=t.substring(0,t.indexOf("/*")))),t.startsWith("//")){m.push("");continue}const y=t.indexOf("//");if(y>=0&&(t=t.substring(0,y).trim()),t.startsWith("#include")||t.startsWith("#define")||t.startsWith("#ifndef")||t.startsWith("#endif")||t.startsWith("#ifdef")){m.push("");continue}if(t.includes("void main(void)")||t.includes("void main()")){C=!0,m.push("");continue}if(C&&t==="}"){C=!1;continue}m.push(t)}let r=0;const f={initialized:!1,baudrate:0,config:{}},g=new Array(16).fill(0);let c=8e6,u={};const T=_=>{const t=Math.min(_/100,500);r+=t};for(let _=0;_<m.length;_++){const t=m[_];if(!t)continue;if(t.includes("Can_Init(")){f.initialized=!0,f.baudrate=5e5;const a=t.match(/CanControllerBaudrate\s*=\s*(\d+)/);a&&(f.baudrate=parseInt(a[1],10)),i.push(`[SIM] Can_Init: CAN controller initialized @ ${f.baudrate} bps`),s.logs.push(`CAN controller initialized @ ${f.baudrate} bps`),s.interrupts.push({source:"CAN",timestamp:r,priority:3,description:`Can_Init called - controller at ${f.baudrate} bps`}),r+=1}if(t.includes("Can_Write(")&&!t.includes("Can_WriteExample"))if(f.initialized){const a=t.match(/\.id\s*=\s*(0x[0-9a-fA-F]+|\d+)/i),d=a?parseInt(a[1],16):291;let N=[170,187,204,221,17,34,51,68];const D=t.match(/\{([0-9xa-fA-F,\s]+)\}/);D&&(N=D[1].split(",").map(b=>{const P=b.trim();return P.startsWith("0x")?parseInt(P,16):parseInt(P,10)}).filter(b=>!isNaN(b)));const M=Math.min(N.length,8);r+=.5,s.canMessages.push({id:d,dlc:M,data:N.slice(0,M),timestamp:r,direction:"tx"}),i.push(`[SIM] Can_Write: TX 0x${d.toString(16).toUpperCase().padStart(3,"0")} [${N.slice(0,M).map(b=>b.toString(16).padStart(2,"0")).join(" ")}]`),s.interrupts.push({source:"CAN",timestamp:r,priority:2,description:`CAN TX: ID=0x${d.toString(16).toUpperCase().padStart(3,"0")}, DLC=${M}`})}else i.push("[SIM] ERROR: Can_Write called before Can_Init"),h=!0,I="Can_Write called before Can_Init";if(t.includes("Can_Read(")&&!t.includes("Can_ReadExample")){r+=.3;const a=256+Math.floor(Math.random()*256),d=Array.from({length:8},()=>Math.floor(Math.random()*256));s.canMessages.push({id:a,dlc:8,data:d,timestamp:r,direction:"rx"}),i.push(`[SIM] Can_Read: RX 0x${a.toString(16).toUpperCase().padStart(3,"0")} [${d.map(N=>N.toString(16).padStart(2,"0")).join(" ")}]`)}if(t.includes("Can_CheckWakeup(")&&(i.push(`[SIM] Can_CheckWakeup: Wakeup detected = ${f.initialized?"YES":"NO"}`),s.interrupts.push({source:"CAN",timestamp:r,priority:1,description:`CAN wakeup check: ${f.initialized?"detected":"not detected"}`})),t.includes("Can_GetVersionInfo(")&&i.push("[SIM] Can_GetVersionInfo: vendor=0x0001, module=0x000A, v4.4.0"),t.includes("Can_SetBaudrate(")&&i.push("[SIM] Can_SetBaudrate: baudrate configuration updated"),t.includes("Dio_WriteChannel(")){const a=t.match(/Dio_WriteChannel\(DIO_PIN_(\d+)\s*,\s*DIO_(HIGH|LOW)\)/);if(a){const d=parseInt(a[1],10),N=a[2]==="HIGH"?1:0;g[d]=N,r+=.1,s.gpioEvents.push({pin:d,timestamp:Date.now(),level:N}),i.push(`[SIM] Dio_WriteChannel: GPIO${d} = ${N?"HIGH":"LOW"}`)}}if(t.includes("Dio_ReadChannel(")&&!t.includes("Dio_ReadChannel()")){const a=t.match(/Dio_ReadChannel\(DIO_PIN_(\d+)\)/);if(a){const d=parseInt(a[1],10);i.push(`[SIM] Dio_ReadChannel: GPIO${d} = ${g[d]?"HIGH":"LOW"}`)}}if(t.includes("Dio_FlipChannel(")){const a=t.match(/Dio_FlipChannel\(DIO_PIN_(\d+)\)/);if(a){const d=parseInt(a[1],10);g[d]=g[d]?0:1,r+=.15;const N=`pin${d}`;u[N]=(u[N]||0)+1,s.gpioEvents.push({pin:d,timestamp:Date.now(),level:g[d]}),i.push(`[SIM] Dio_FlipChannel: GPIO${d} flipped to ${g[d]?"HIGH":"LOW"} (flip #${u[N]})`),s.interrupts.push({source:"DIO",timestamp:r,priority:4,description:`GPIO${d} flipped to ${g[d]?"HIGH":"LOW"}`})}}if(t.includes("Dio_WritePort(")){const a=t.match(/Dio_WritePort\(\s*(\d+)\s*,\s*(0x[0-9a-fA-F]+|\d+)\)/);if(a){const d=parseInt(a[1],10);i.push(`[SIM] Dio_WritePort: Port ${d} written`),r+=.2}}if(t.includes("Spi_Init(")&&(i.push("[SIM] Spi_Init: SPI controller initialized"),s.interrupts.push({source:"SPI",timestamp:r,priority:3,description:"SPI controller initialized"}),r+=1),t.includes("Spi_WriteIB(")){const a=t.match(/Spi_WriteIB\(\s*(\d+)\s*,\s*\w+\s*,\s*(\d+)\)/),d=a?parseInt(a[2],10):4;i.push(`[SIM] Spi_WriteIB: ${d} bytes written to SPI channel`),r+=.5}if(t.includes("Spi_ReadIB(")&&(i.push("[SIM] Spi_ReadIB: data read from SPI (returned 0xFF fill)"),r+=.5),t.includes("Spi_Exchange(")){const a=t.match(/Spi_Exchange\(\s*(\d+)\s*,\s*\w+\s*,\s*\w+\s*,\s*(\d+)\)/),d=a?parseInt(a[2],10):4;i.push(`[SIM] Spi_Exchange: ${d}-byte SPI transfer completed (Tx data inverted on Rx)`),s.interrupts.push({source:"SPI",timestamp:r,priority:2,description:`SPI exchange: ${d} bytes transferred`}),r+=.8}t.includes("Mcu_Init(")&&(i.push("[SIM] Mcu_Init: MCU initialized with HSI/PLL clock config"),s.interrupts.push({source:"MCU",timestamp:r,priority:0,description:"MCU initialized - clock tree configured"}),r+=2),t.includes("Mcu_InitClock(")&&(t.includes("MCU_CLOCK_TYPE_PLL")?(c=72e6,i.push("[SIM] Mcu_InitClock: Switched to PLL clock @ 72 MHz")):t.includes("MCU_CLOCK_TYPE_HSE")?(c=16e6,i.push("[SIM] Mcu_InitClock: Switched to HSE clock @ 16 MHz")):(c=8e6,i.push("[SIM] Mcu_InitClock: Switched to HSI clock @ 8 MHz")),s.interrupts.push({source:"MCU",timestamp:r,priority:1,description:`Clock switched to ${c/1e6} MHz`}),r+=1),t.includes("Mcu_GetResetReason(")&&i.push("[SIM] Mcu_GetResetReason: Reset reason = POWER_ON_RESET"),t.includes("Mcu_PerformReset(")&&(i.push("[SIM] Mcu_PerformReset: System reset executed"),s.interrupts.push({source:"MCU",timestamp:r,priority:0,description:"System reset performed"})),t.match(/NvM_ReadBlock\s*\(/)&&(i.push("[SIM] NvM_ReadBlock: Data read from NVRAM block"),r+=.5),t.match(/NvM_WriteBlock\s*\(/)&&(i.push("[SIM] NvM_WriteBlock: Data written to NVRAM block"),s.interrupts.push({source:"MCU",timestamp:r,priority:2,description:"NVRAM write operation"}),r+=1);const y=t.match(/delay\s*\(\s*(\d+)\s*\)/);y&&T(parseInt(y[1],10));const S=t.match(/for\s*\([^;]*;\s*(\w+)\s*<\s*(\d+)/);if(S){const a=parseInt(S[2],10);r+=Math.min(a*.5,100)}}s.isRunning=!0,i.push(""),i.push("=== Simulation Complete ==="),i.push(`Virtual time: ${r.toFixed(1)} ms`),i.push(`CAN messages sent: ${s.canMessages.filter(_=>_.direction==="tx").length}`),i.push(`CAN messages received: ${s.canMessages.filter(_=>_.direction==="rx").length}`),i.push(`GPIO events: ${s.gpioEvents.length}`),i.push(`Interrupts: ${s.interrupts.length}`),i.push(`MCU clock: ${(c/1e6).toFixed(0)} MHz`)}catch(o){h=!0,I=o instanceof Error?o.message:"Unknown simulation error",i.push(`[ERROR] ${I}`)}return{success:!h,state:s,output:i,error:I}}const re=`#ifndef AUTOSAR_STD_TYPES_H
#define AUTOSAR_STD_TYPES_H

/* Standard Integer Types */
typedef unsigned char uint8;
typedef unsigned short uint16;
typedef unsigned int uint32;
typedef signed char sint8;
typedef signed short sint16;
typedef signed int sint32;
typedef uint8 boolean;

/* Boolean Values */
#ifndef TRUE
#define TRUE 1
#endif
#ifndef FALSE
#define FALSE 0
#endif

/* Standard Return Type */
typedef uint8 Std_ReturnType;
#define E_OK    0
#define E_NOT_OK 1

/* Version Info Type */
typedef struct {
    uint16 vendorID;
    uint16 moduleID;
    uint8 sw_major_version;
    uint8 sw_minor_version;
    uint8 sw_patch_version;
} Std_VersionInfoType;

/* NULL Pointer */
#ifndef NULL
#define NULL ((void*)0)
#endif

#endif /* AUTOSAR_STD_TYPES_H */
`,oe=`#ifndef AUTOSAR_CAN_H
#define AUTOSAR_CAN_H

#include "Std_Types.h"

/* CAN Hardware Handle Types */
typedef uint16 Can_HwHandleType;
#define CAN_HTH_0 ((Can_HwHandleType)0)
#define CAN_HTH_1 ((Can_HwHandleType)1)
#define CAN_HRH_0 ((Can_HwHandleType)0)
#define CAN_HRH_1 ((Can_HwHandleType)1)

/* CAN PDU Type */
typedef struct {
    uint32 id;
    uint8 length;
    uint8* sdu;
    void* swPduHandle;
} Can_PduType;

/* CAN Controller Type */
typedef struct {
    uint8 CanControllerId;
    uint32 CanControllerBaudrate;
    uint8 CanControllerWakeupSource;
} Can_ControllerType;

/* CAN Configuration Type */
typedef struct {
    Can_ControllerType Controller;
} Can_ConfigType;

/* CAN Baudrate Configuration IDs */
#define CAN_BAUDRATE_125KBPS 0
#define CAN_BAUDRATE_250KBPS 1
#define CAN_BAUDRATE_500KBPS 2
#define CAN_BAUDRATE_1MBPS   3

/* CAN Wakeup Source */
#define CAN_WAKEUP_SOURCE_INTERNAL 0
#define CAN_WAKEUP_SOURCE_EXTERNAL 1

/* EcuM Wakeup Source Type */
typedef uint8 EcuM_WakeupSourceType;
#define ECUM_WAKEUP_SOURCE_CAN 0
#define ECUM_WAKEUP_SOURCE_CAN_1 1

/* Function Prototypes */
Std_ReturnType Can_Init(const Can_ConfigType* Config);
Std_ReturnType Can_Write(Can_HwHandleType Hth, const Can_PduType* PduInfo);
void Can_Read(Can_HwHandleType Hrh, Can_PduType* PduInfo);
Std_ReturnType Can_SetBaudrate(Can_HwHandleType Hth, uint16 BaudRateConfigID);
void Can_GetVersionInfo(Std_VersionInfoType* VersionInfo);
Std_ReturnType Can_CheckWakeup(EcuM_WakeupSourceType WakeupSource);

/* Virtual Implementation */
static int _sim_can_initialized = 0;
static Can_ConfigType _sim_can_config;

Std_ReturnType Can_Init(const Can_ConfigType* Config) {
    if (Config == NULL) return E_NOT_OK;
    _sim_can_config = *Config;
    _sim_can_initialized = 1;
    return E_OK;
}

Std_ReturnType Can_Write(Can_HwHandleType Hth, const Can_PduType* PduInfo) {
    if (!_sim_can_initialized) return E_NOT_OK;
    if (PduInfo == NULL || PduInfo->sdu == NULL) return E_NOT_OK;
    /* In simulation, this writes to a virtual bus */
    return E_OK;
}

void Can_Read(Can_HwHandleType Hrh, Can_PduType* PduInfo) {
    if (PduInfo != NULL) {
        PduInfo->id = 0;
        PduInfo->length = 0;
        PduInfo->sdu = NULL;
    }
}

Std_ReturnType Can_SetBaudrate(Can_HwHandleType Hth, uint16 BaudRateConfigID) {
    if (!_sim_can_initialized) return E_NOT_OK;
    _sim_can_config.Controller.CanControllerBaudrate = BaudRateConfigID;
    return E_OK;
}

void Can_GetVersionInfo(Std_VersionInfoType* VersionInfo) {
    if (VersionInfo != NULL) {
        VersionInfo->vendorID = 1;
        VersionInfo->moduleID = 10;
        VersionInfo->sw_major_version = 4;
        VersionInfo->sw_minor_version = 4;
        VersionInfo->sw_patch_version = 0;
    }
}

Std_ReturnType Can_CheckWakeup(EcuM_WakeupSourceType WakeupSource) {
    return (_sim_can_initialized) ? E_OK : E_NOT_OK;
}

#endif /* AUTOSAR_CAN_H */
`,se=`#ifndef AUTOSAR_DIO_H
#define AUTOSAR_DIO_H

#include "Std_Types.h"

/* DIO Channel Type */
typedef uint16 Dio_ChannelType;
typedef uint16 Dio_PortType;
typedef uint8 Dio_LevelType;

#define DIO_LOW  0
#define DIO_HIGH 1
#define DIO_PIN_0 0
#define DIO_PIN_1 1
#define DIO_PIN_2 2
#define DIO_PIN_3 3
#define DIO_PIN_4 4
#define DIO_PIN_5 5
#define DIO_PIN_6 6
#define DIO_PIN_7 7
#define DIO_PIN_8 8
#define DIO_PIN_9 9
#define DIO_PIN_10 10
#define DIO_PIN_11 11
#define DIO_PIN_12 12
#define DIO_PIN_13 13
#define DIO_PIN_14 14
#define DIO_PIN_15 15

typedef struct {
    uint8 Port;
    uint8 Pin;
    uint8 Direction;
    uint8 Level;
} Dio_ChannelConfigType;

/* Function Prototypes */
Dio_LevelType Dio_ReadChannel(Dio_ChannelType ChannelId);
void Dio_WriteChannel(Dio_ChannelType ChannelId, Dio_LevelType Level);
Dio_LevelType Dio_FlipChannel(Dio_ChannelType ChannelId);
void Dio_ReadPort(Dio_PortType PortId, Dio_LevelType* PortPtr);
void Dio_WritePort(Dio_PortType PortId, Dio_LevelType Level);

/* Virtual Simulation State */
static Dio_LevelType _sim_dio_channels[16] = {0};

Dio_LevelType Dio_ReadChannel(Dio_ChannelType ChannelId) {
    if (ChannelId >= 16) return DIO_LOW;
    return _sim_dio_channels[ChannelId];
}

void Dio_WriteChannel(Dio_ChannelType ChannelId, Dio_LevelType Level) {
    if (ChannelId < 16) {
        _sim_dio_channels[ChannelId] = Level;
    }
}

Dio_LevelType Dio_FlipChannel(Dio_ChannelType ChannelId) {
    if (ChannelId >= 16) return DIO_LOW;
    _sim_dio_channels[ChannelId] = !_sim_dio_channels[ChannelId];
    return _sim_dio_channels[ChannelId];
}

void Dio_ReadPort(Dio_PortType PortId, Dio_LevelType* PortPtr) {
    if (PortPtr != NULL) {
        *PortPtr = 0;
    }
}

void Dio_WritePort(Dio_PortType PortId, Dio_LevelType Level) {
    /* Write to all pins on the virtual port */
}

#endif /* AUTOSAR_DIO_H */
`,ae=`#ifndef AUTOSAR_PORT_H
#define AUTOSAR_PORT_H

#include "Std_Types.h"

/* Port Pin Direction */
#define PORT_PIN_IN  0
#define PORT_PIN_OUT 1

/* Port Pin Mode */
#define PORT_PIN_MODE_DIO     0
#define PORT_PIN_MODE_CAN     1
#define PORT_PIN_MODE_SPI     2
#define PORT_PIN_MODE_UART    3

/* Port Pin */
typedef uint8 Port_PinType;
typedef uint8 Port_PinDirectionType;
typedef uint8 Port_PinModeType;

typedef struct {
    Port_PinType Pin;
    Port_PinDirectionType Direction;
    Port_PinModeType Mode;
    uint8 InitialLevel;
} Port_ConfigPinType;

typedef struct {
    Port_ConfigPinType* Pins;
    uint8 PinCount;
} Port_ConfigType;

/* Function Prototypes */
void Port_Init(const Port_ConfigType* Config);
void Port_SetPinDirection(Port_PinType Pin, Port_PinDirectionType Direction);
void Port_SetPinMode(Port_PinType Pin, Port_PinModeType Mode);
void Port_GetVersionInfo(Std_VersionInfoType* VersionInfo);

/* Virtual Implementation */
static uint8 _sim_port_initialized = 0;

void Port_Init(const Port_ConfigType* Config) {
    (void)Config;
    _sim_port_initialized = 1;
}

void Port_SetPinDirection(Port_PinType Pin, Port_PinDirectionType Direction) {
    (void)Pin;
    (void)Direction;
    if (!_sim_port_initialized) return;
}

void Port_SetPinMode(Port_PinType Pin, Port_PinModeType Mode) {
    (void)Pin;
    (void)Mode;
    if (!_sim_port_initialized) return;
}

void Port_GetVersionInfo(Std_VersionInfoType* VersionInfo) {
    if (VersionInfo != NULL) {
        VersionInfo->vendorID = 1;
        VersionInfo->moduleID = 20;
        VersionInfo->sw_major_version = 4;
        VersionInfo->sw_minor_version = 4;
        VersionInfo->sw_patch_version = 0;
    }
}

#endif /* AUTOSAR_PORT_H */
`,de=`#ifndef AUTOSAR_SPI_H
#define AUTOSAR_SPI_H

#include "Std_Types.h"

/* SPI Channel Type */
typedef uint8 Spi_ChannelType;
typedef uint8 Spi_SequenceType;
typedef uint8 Spi_JobType;

/* SPI Data Mode */
#define SPI_MODE_0 0
#define SPI_MODE_1 1
#define SPI_MODE_2 2
#define SPI_MODE_3 3

/* SPI Status */
#define SPI_IDLE    0
#define SPI_BUSY    1
#define SPI_COMPLETE 2

/* SPI Channel Config */
typedef struct {
    Spi_ChannelType Channel;
    uint8 Baudrate;
    uint8 DataWidth;
    uint8 Mode;
} Spi_ChannelConfigType;

/* SPI Job Config */
typedef struct {
    Spi_JobType Job;
    Spi_ChannelType Channel;
    uint8* DataBuffer;
    uint16 BufferSize;
} Spi_JobConfigType;

/* Function Prototypes */
void Spi_Init(const Spi_ChannelConfigType* Config);
Std_ReturnType Spi_WriteIB(Spi_ChannelType Channel, const uint8* DataBuffer, uint16 BufferSize);
Std_ReturnType Spi_ReadIB(Spi_ChannelType Channel, uint8* DataBuffer, uint16 BufferSize);
Std_ReturnType Spi_Exchange(Spi_ChannelType Channel, const uint8* TxData, uint8* RxData, uint16 BufferSize);
void Spi_GetVersionInfo(Std_VersionInfoType* VersionInfo);

/* Virtual Implementation */
static uint8 _sim_spi_initialized = 0;

void Spi_Init(const Spi_ChannelConfigType* Config) {
    (void)Config;
    _sim_spi_initialized = 1;
}

Std_ReturnType Spi_WriteIB(Spi_ChannelType Channel, const uint8* DataBuffer, uint16 BufferSize) {
    (void)Channel;
    (void)DataBuffer;
    (void)BufferSize;
    if (!_sim_spi_initialized) return E_NOT_OK;
    return E_OK;
}

Std_ReturnType Spi_ReadIB(Spi_ChannelType Channel, uint8* DataBuffer, uint16 BufferSize) {
    (void)Channel;
    (void)BufferSize;
    if (!_sim_spi_initialized) return E_NOT_OK;
    if (DataBuffer != NULL) {
        /* Return simulated data */
        uint16 i;
        for (i = 0; i < BufferSize; i++) {
            DataBuffer[i] = 0xFF;
        }
    }
    return E_OK;
}

Std_ReturnType Spi_Exchange(Spi_ChannelType Channel, const uint8* TxData, uint8* RxData, uint16 BufferSize) {
    (void)Channel;
    uint16 i;
    if (!_sim_spi_initialized) return E_NOT_OK;
    if (TxData != NULL && RxData != NULL) {
        for (i = 0; i < BufferSize; i++) {
            RxData[i] = ~TxData[i]; /* Simple mock: return inverted data */
        }
    }
    return E_OK;
}

void Spi_GetVersionInfo(Std_VersionInfoType* VersionInfo) {
    if (VersionInfo != NULL) {
        VersionInfo->vendorID = 1;
        VersionInfo->moduleID = 30;
        VersionInfo->sw_major_version = 4;
        VersionInfo->sw_minor_version = 4;
        VersionInfo->sw_patch_version = 0;
    }
}

#endif /* AUTOSAR_SPI_H */
`,le=`#ifndef AUTOSAR_MCU_H
#define AUTOSAR_MCU_H

#include "Std_Types.h"

/* MCU Clock Types */
typedef uint8 Mcu_ClockType;
#define MCU_CLOCK_TYPE_HSI 0
#define MCU_CLOCK_TYPE_HSE 1
#define MCU_CLOCK_TYPE_PLL 2

/* MCU Clock Setting */
typedef struct {
    Mcu_ClockType ClockType;
    uint32 Frequency;
    uint32 SourceFrequency;
} Mcu_ClockSettingType;

/* MCU RAM Section */
typedef struct {
    uint32 StartAddress;
    uint32 Size;
} Mcu_RamSectionType;

/* MCU PLL Config */
typedef struct {
    uint8 PllMul;
    uint8 PllDiv;
    uint8 PllPreDiv;
} Mcu_PllConfigType;

/* MCU Config Type */
typedef struct {
    Mcu_ClockSettingType* ClockSettings;
    uint8 ClockSettingCount;
    Mcu_PllConfigType PllConfig;
} Mcu_ConfigType;

/* MCU Reset Reason */
typedef uint8 Mcu_ResetType;
#define MCU_POWER_ON_RESET     0
#define MCU_WATCHDOG_RESET     1
#define MCU_SOFTWARE_RESET     2
#define MCU_EXTERNAL_RESET     3

/* Function Prototypes */
void Mcu_Init(const Mcu_ConfigType* Config);
Std_ReturnType Mcu_InitClock(Mcu_ClockType ClockSetting);
void Mcu_GetResetReason(Mcu_ResetType* ResetReason);
void Mcu_PerformReset(void);
void Mcu_SetMode(uint8 McuMode);
void Mcu_GetVersionInfo(Std_VersionInfoType* VersionInfo);

/* Virtual Implementation */
static uint8 _sim_mcu_initialized = 0;
static Mcu_ClockSettingType _sim_mcu_clock;

void Mcu_Init(const Mcu_ConfigType* Config) {
    if (Config != NULL && Config->ClockSettings != NULL) {
        _sim_mcu_clock = Config->ClockSettings[0];
    }
    _sim_mcu_initialized = 1;
}

Std_ReturnType Mcu_InitClock(Mcu_ClockType ClockSetting) {
    if (!_sim_mcu_initialized) return E_NOT_OK;
    _sim_mcu_clock.ClockType = ClockSetting;
    return E_OK;
}

void Mcu_GetResetReason(Mcu_ResetType* ResetReason) {
    if (ResetReason != NULL) {
        *ResetReason = MCU_POWER_ON_RESET;
    }
}

void Mcu_PerformReset(void) {
    _sim_mcu_initialized = 0;
}

void Mcu_SetMode(uint8 McuMode) {
    (void)McuMode;
}

void Mcu_GetVersionInfo(Std_VersionInfoType* VersionInfo) {
    if (VersionInfo != NULL) {
        VersionInfo->vendorID = 1;
        VersionInfo->moduleID = 40;
        VersionInfo->sw_major_version = 4;
        VersionInfo->sw_minor_version = 4;
        VersionInfo->sw_patch_version = 0;
    }
}

#endif /* AUTOSAR_MCU_H */
`,ce=[{name:"Std_Types.h",content:re,module:"Common"},{name:"Can.h",content:oe,module:"Can"},{name:"Dio.h",content:se,module:"Dio"},{name:"Port.h",content:ae,module:"Port"},{name:"Spi.h",content:de,module:"Spi"},{name:"Mcu.h",content:le,module:"Mcu"}];function ue({onCanMessages:x,onGpioEvents:s,onInterrupts:i,initialExampleId:h}){const I=h?U(h)??j[0]:j[0],[o,n]=p.useState(I.code),[C,m]=p.useState([]),[r,f]=p.useState(!1),[g,c]=p.useState(I.id),[u,T]=p.useState(!0),[_,t]=p.useState("code"),[y,S]=p.useState("idle"),a=p.useRef(null),d=p.useCallback(l=>{const R=U(l);R&&(c(l),n(R.code),m([]),S("idle"))},[]),N=p.useCallback(()=>{f(!0),S("running"),m([]),setTimeout(()=>{const l=ie(o);m(l.output),S(l.success?"success":"error"),l.success&&(x?.(l.state.canMessages),s?.(l.state.gpioEvents),i?.(l.state.interrupts)),f(!1),setTimeout(()=>{a.current&&(a.current.scrollTop=a.current.scrollHeight)},100)},300)},[o,x,s,i]),D=p.useCallback(()=>{f(!1),S("idle")},[]),M=p.useCallback(()=>{m([]),S("idle")},[]),b=p.useCallback(l=>{l!==void 0&&(n(l),S("idle"))},[]),P=()=>{switch(y){case"running":return e.jsxs("span",{className:"inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400",children:[e.jsx(J,{className:"w-3 h-3 animate-spin"}),"Compiling..."]});case"success":return e.jsxs("span",{className:"inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400",children:[e.jsx(Q,{className:"w-3 h-3"}),"Simulation OK"]});case"error":return e.jsxs("span",{className:"inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400",children:[e.jsx(X,{className:"w-3 h-3"}),"Error"]});default:return e.jsxs("span",{className:"inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground",children:[e.jsx(H,{className:"w-3 h-3"}),"Ready"]})}};return e.jsxs("div",{className:"flex flex-col h-full",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2 border-b border-border bg-muted/20",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("select",{value:g,onChange:l=>d(l.target.value),className:"text-xs px-2.5 py-1.5 rounded-lg bg-background border border-border focus:outline-none focus:border-primary/50 max-w-[200px]",children:e.jsx("optgroup",{label:"Examples",children:j.map(l=>e.jsxs("option",{value:l.id,children:["[",l.category,"] ",l.name]},l.id))})}),e.jsxs("label",{className:"flex items-center gap-1.5 text-[10px] text-muted-foreground cursor-pointer",children:[e.jsx("input",{type:"checkbox",checked:u,onChange:l=>T(l.target.checked),className:"rounded border-border accent-primary"}),"Auto Headers"]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(P,{}),e.jsx("button",{onClick:M,disabled:C.length===0,className:"p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed",title:"Clear output",children:e.jsx(G,{className:"w-3.5 h-3.5"})}),r?e.jsxs("button",{onClick:D,className:"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors",children:[e.jsx(Y,{className:"w-3 h-3"}),"Stop"]}):e.jsxs("button",{onClick:N,className:"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors",children:[e.jsx(q,{className:"w-3 h-3"}),"Run"]})]})]}),e.jsxs("div",{className:"flex border-b border-border bg-muted/10",children:[e.jsxs("button",{onClick:()=>t("code"),className:`px-4 py-1.5 text-xs font-medium border-b-2 transition-colors ${_==="code"?"border-primary text-foreground":"border-transparent text-muted-foreground hover:text-foreground"}`,children:[e.jsx(w,{className:"w-3 h-3 inline mr-1"}),"Code"]}),e.jsxs("button",{onClick:()=>t("headers"),className:`px-4 py-1.5 text-xs font-medium border-b-2 transition-colors ${_==="headers"?"border-primary text-foreground":"border-transparent text-muted-foreground hover:text-foreground"}`,children:[e.jsx(w,{className:"w-3 h-3 inline mr-1"}),"Headers"]})]}),e.jsx("div",{className:"flex-1 relative overflow-hidden",children:_==="code"?e.jsx(F,{height:"100%",defaultLanguage:"c",theme:"vs-dark",value:o,onChange:b,options:{minimap:{enabled:!1},fontSize:13,lineNumbers:"on",scrollBeyondLastLine:!1,padding:{top:8},fontFamily:"'JetBrains Mono', 'Fira Code', monospace",tabSize:4,insertSpaces:!0,automaticLayout:!0,wordWrap:"on"}}):e.jsxs("div",{className:"h-full overflow-y-auto p-4 bg-[#1e1e1e]",children:[e.jsx("h3",{className:"text-xs font-medium text-[#cccccc] mb-3",children:"AutoSAR Virtual Headers"}),e.jsx("div",{className:"grid gap-4",children:ce.map(l=>e.jsxs("details",{className:"group",children:[e.jsx("summary",{className:"text-xs text-[#569cd6] cursor-pointer hover:text-[#75b5e8] font-mono mb-1",children:l.name}),e.jsxs("pre",{className:"text-[11px] text-[#d4d4d4] font-mono bg-[#2d2d2d] rounded-lg p-3 overflow-x-auto max-h-64 overflow-y-auto",children:[l.content.split(`
`).slice(0,60).join(`
`),l.content.split(`
`).length>60&&e.jsx("span",{className:"text-[#6a9955]",children:"\\n... (truncated)"})]})]},l.name))})]})}),e.jsxs(v.div,{initial:!1,className:"border-t border-border bg-[#1a1a2e]",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-1.5 border-b border-border/50",children:[e.jsxs("span",{className:"text-[10px] font-medium text-muted-foreground flex items-center gap-1.5",children:[e.jsx(H,{className:"w-3 h-3"}),"Output"]}),e.jsx("span",{className:"text-[9px] text-muted-foreground/60",children:"Simulation Mode"})]}),e.jsx("div",{ref:a,className:"overflow-y-auto font-mono text-[11px] leading-relaxed p-3",style:{maxHeight:"180px",minHeight:"60px"},children:C.length===0?e.jsx("span",{className:"text-muted-foreground/40",children:'Click "Run" to simulate your AutoSAR code...'}):C.map((l,R)=>{const k=l.includes("[ERROR]")||l.includes("ERROR:"),B=l.startsWith("[SIM]"),V=l.startsWith("===");return e.jsx("div",{className:`whitespace-pre-wrap ${k?"text-red-400":V?"text-primary font-semibold":B?"text-green-400":"text-foreground/80"}`,children:l},R)})})]})]})}function pe({messages:x,maxMessages:s=100}){const i=p.useRef(null),[h,I]=p.useState(""),[o,n]=p.useState(!0),[C,m]=p.useState(!0),f=(h?x.filter(u=>u.id.toString(16).includes(h.toLowerCase())||u.data.map(T=>T.toString(16).padStart(2,"0")).join(" ").includes(h.toLowerCase())):x).slice(-s);p.useEffect(()=>{o&&i.current&&(i.current.scrollTop=i.current.scrollHeight)},[f.length,o]);const g=(u,T=2)=>u.toString(16).toUpperCase().padStart(T,"0"),c=u=>u<256?"text-green-500":u<512?"text-blue-500":u<1024?"text-amber-500":"text-red-500";return e.jsxs("div",{className:"rounded-xl border border-border bg-card overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(L,{className:"w-4 h-4 text-primary"}),e.jsx("span",{className:"text-sm font-medium",children:"CAN Bus Monitor"}),e.jsxs("span",{className:"text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400",children:[x.length," msgs"]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{onClick:()=>n(!o),className:`px-2 py-1 text-[10px] rounded-md border transition-colors ${o?"bg-primary/10 border-primary/30 text-primary":"border-border text-muted-foreground"}`,children:"Auto"}),e.jsx("button",{onClick:()=>m(!C),className:`px-2 py-1 text-[10px] rounded-md border transition-colors ${C?"bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400":"bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"}`,children:C?"Running":"Paused"})]})]}),e.jsx("div",{className:"px-4 py-2 border-b border-border",children:e.jsxs("div",{className:"relative",children:[e.jsx(Z,{className:"absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"}),e.jsx("input",{type:"text",value:h,onChange:u=>I(u.target.value),placeholder:"Filter by ID or data (hex)...",className:"w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:border-primary/50"}),h&&e.jsx("button",{onClick:()=>I(""),className:"absolute right-2 top-1/2 -translate-y-1/2",children:e.jsx(ee,{className:"w-3.5 h-3.5 text-muted-foreground hover:text-foreground"})})]})}),e.jsx("div",{ref:i,className:"overflow-y-auto",style:{maxHeight:"320px"},children:f.length===0?e.jsxs("div",{className:"flex flex-col items-center justify-center py-12 text-muted-foreground",children:[e.jsx(L,{className:"w-8 h-8 mb-2 opacity-30"}),e.jsx("p",{className:"text-xs",children:"No CAN messages"}),e.jsx("p",{className:"text-[10px] opacity-60",children:"Run your code to see bus activity"})]}):e.jsxs("table",{className:"w-full text-[11px] font-mono",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-border bg-muted/20",children:[e.jsx("th",{className:"text-left px-3 py-1.5 text-[10px] text-muted-foreground font-medium",children:"Time"}),e.jsx("th",{className:"text-left px-3 py-1.5 text-[10px] text-muted-foreground font-medium",children:"Dir"}),e.jsx("th",{className:"text-left px-3 py-1.5 text-[10px] text-muted-foreground font-medium",children:"ID"}),e.jsx("th",{className:"text-left px-3 py-1.5 text-[10px] text-muted-foreground font-medium",children:"DLC"}),e.jsx("th",{className:"text-left px-3 py-1.5 text-[10px] text-muted-foreground font-medium",children:"Data"})]})}),e.jsx("tbody",{children:f.map((u,T)=>e.jsxs(v.tr,{initial:{opacity:0,x:-10},animate:{opacity:1,x:0},transition:{duration:.15},className:"border-b border-border/30 hover:bg-muted/20 transition-colors",children:[e.jsxs("td",{className:"px-3 py-1.5 text-muted-foreground text-[10px]",children:[u.timestamp.toFixed(1),"ms"]}),e.jsx("td",{className:"px-3 py-1.5",children:e.jsx("span",{className:`text-[10px] font-medium ${u.direction==="tx"?"text-blue-500":"text-green-500"}`,children:u.direction==="tx"?"TX":"RX"})}),e.jsxs("td",{className:`px-3 py-1.5 font-semibold ${c(u.id)}`,children:["0x",g(u.id,3)]}),e.jsx("td",{className:"px-3 py-1.5 text-muted-foreground",children:u.dlc}),e.jsx("td",{className:"px-3 py-1.5",children:e.jsx("div",{className:"flex gap-0.5",children:u.data.slice(0,u.dlc).map((_,t)=>e.jsx("span",{className:`inline-block px-1 rounded ${_===0?"text-muted-foreground/50":"text-foreground"}`,children:g(_)},t))})})]},`${u.timestamp}-${u.id}-${T}`))})]})})]})}const A=["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#14b8a6","#f97316","#6366f1","#84cc16","#06b6d4","#d946ef","#0ea5e9","#22c55e","#eab308","#a855f7"];function fe({events:x,pins:s=[0,1,2,3],timeWindow:i=1e3}){const h=p.useRef(null),I=p.useMemo(()=>{const o=Date.now(),n=x.filter(m=>o-m.timestamp<i),C=new Map;for(const m of s){const r=n.filter(f=>f.pin===m).sort((f,g)=>f.timestamp-g.timestamp);C.set(m,r)}return C},[x,s,i]);return p.useEffect(()=>{const o=h.current;if(!o)return;const n=o.getContext("2d");if(!n)return;const C=window.devicePixelRatio||1,m=o.getBoundingClientRect();o.width=m.width*C,o.height=m.height*C,n.scale(C,C);const r=m.width,f=m.height,g=f/s.length,c={left:40,right:16,top:8,bottom:8},u=r-c.left-c.right,T=Date.now();n.clearRect(0,0,r,f),n.strokeStyle="rgba(100, 116, 139, 0.15)",n.lineWidth=.5;const _=5;for(let t=0;t<=_;t++){const y=c.left+u/_*t;n.beginPath(),n.moveTo(y,0),n.lineTo(y,f),n.stroke()}s.forEach((t,y)=>{const S=y*g,a=S+g/2;n.fillStyle=A[t%A.length],n.font="10px monospace",n.textAlign="right",n.fillText(`GPIO${t}`,c.left-6,a+3),n.strokeStyle="rgba(100, 116, 139, 0.2)",n.lineWidth=.5,n.beginPath(),n.moveTo(c.left,a),n.lineTo(r-c.right,a),n.stroke();const d=I.get(t)||[];if(n.strokeStyle=A[t%A.length],n.lineWidth=1.5,n.beginPath(),d.length===0){n.moveTo(c.left,S+g-c.bottom),n.lineTo(r-c.right,S+g-c.bottom),n.stroke();return}let D=d[0].level;const M=c.left,b=S+c.top+2,P=S+g-c.bottom-2;n.moveTo(M,D?b:P);for(const l of d){const R=c.left+(1-(T-l.timestamp)/i)*u,k=l.level?b:P;if(!(R<c.left)){if(R>r-c.right)break;n.lineTo(R,k),D=l.level}}n.lineTo(r-c.right,D?b:P),n.stroke(),n.fillStyle="rgba(100, 116, 139, 0.5)",n.font="8px monospace",n.textAlign="left",n.fillText("1",c.left+2,S+c.top+8),n.fillText("0",c.left+2,S+g-c.bottom-2)}),n.fillStyle="rgba(100, 116, 139, 0.6)",n.font="8px monospace",n.textAlign="center";for(let t=0;t<=_;t++){const y=c.left+u/_*t,S=`${(i/_*(_-t)/1e3).toFixed(1)}s`;n.fillText(S,y,f-1)}},[I,s,i]),e.jsxs("div",{className:"rounded-xl border border-border bg-card overflow-hidden",children:[e.jsxs("div",{className:"flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30",children:[e.jsx(W,{className:"w-4 h-4 text-primary"}),e.jsx("span",{className:"text-sm font-medium",children:"GPIO Waveform"}),e.jsxs("span",{className:"text-[10px] text-muted-foreground ml-auto",children:[i/1e3,"s window"]})]}),e.jsx("div",{className:"p-2",children:e.jsx("canvas",{ref:h,className:"w-full",style:{height:`${s.length*48}px`,minHeight:"120px"}})})]})}const O={CAN:"bg-blue-500",DIO:"bg-green-500",SPI:"bg-amber-500",MCU:"bg-red-500",TIMER:"bg-purple-500",UART:"bg-pink-500",DEFAULT:"bg-slate-500"};function _e({events:x,maxEvents:s=50,timeWindow:i=2e3}){const h=p.useMemo(()=>{const o=Date.now();return x.filter(n=>o-n.timestamp<i).slice(-s).reverse()},[x,s,i]),I=p.useMemo(()=>{const o={};for(const n of x)o[n.source]=(o[n.source]||0)+1;return Object.entries(o).sort((n,C)=>C[1]-n[1]).slice(0,5)},[x]);return h.length===0&&I.length===0?e.jsxs("div",{className:"rounded-xl border border-border bg-card overflow-hidden",children:[e.jsxs("div",{className:"flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30",children:[e.jsx(E,{className:"w-4 h-4 text-primary"}),e.jsx("span",{className:"text-sm font-medium",children:"Interrupt Timeline"})]}),e.jsxs("div",{className:"flex flex-col items-center justify-center py-12 text-muted-foreground",children:[e.jsx(E,{className:"w-8 h-8 mb-2 opacity-30"}),e.jsx("p",{className:"text-xs",children:"No interrupts triggered"}),e.jsx("p",{className:"text-[10px] opacity-60",children:"Run code to see interrupt activity"})]})]}):e.jsxs("div",{className:"rounded-xl border border-border bg-card overflow-hidden",children:[e.jsxs("div",{className:"flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30",children:[e.jsx(E,{className:"w-4 h-4 text-primary"}),e.jsx("span",{className:"text-sm font-medium",children:"Interrupt Timeline"}),e.jsxs("span",{className:"text-[10px] text-muted-foreground ml-auto",children:[h.length," in ",i/1e3,"s"]})]}),I.length>0&&e.jsx("div",{className:"px-4 py-2 border-b border-border bg-muted/10",children:e.jsx("div",{className:"flex flex-wrap gap-2",children:I.map(([o,n])=>e.jsxs("span",{className:"inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border",children:[e.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${O[o]||O.DEFAULT}`}),o,": ",n]},o))})}),e.jsx("div",{className:"px-4 py-3 max-h-[280px] overflow-y-auto",children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute left-0 right-0 top-0 h-px bg-border/30"}),h.map((o,n)=>e.jsxs(v.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.2,delay:n*.02},className:"flex items-start gap-3 py-1.5 relative",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:`w-2 h-2 rounded-full ${O[o.source]||O.DEFAULT} shadow-sm`}),n<h.length-1&&e.jsx("div",{className:"w-px flex-1 bg-border/20 mt-0.5"})]}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:`text-[10px] font-semibold px-1.5 py-0.5 rounded ${O[o.source]?`bg-${O[o.source].replace("bg-","")}/10 text-${O[o.source].replace("bg-","")}`:"bg-slate-500/10 text-slate-500"}`,children:o.source}),e.jsxs("span",{className:"text-[10px] text-muted-foreground",children:["(",o.timestamp.toFixed(1),"ms)"]}),e.jsxs("span",{className:"text-[9px] text-muted-foreground/60 ml-auto",children:["prio ",o.priority]})]}),e.jsx("p",{className:"text-[11px] text-foreground/80 mt-0.5 truncate",children:o.description})]})]},`${o.timestamp}-${o.source}-${n}`))]})})]})}function me(x){const s=x.toLowerCase();return j.find(h=>h.code.toLowerCase().includes(s))?.id}function Se(){const[x]=z(),s=x.get("example"),i=s?me(s):void 0,[h,I]=p.useState([]),[o,n]=p.useState([]),[C,m]=p.useState([]),[r,f]=p.useState("can"),g=p.useCallback(t=>{I(y=>[...y,...t].slice(-500))},[]),c=p.useCallback(t=>{n(y=>[...y,...t].slice(-200))},[]),u=p.useCallback(t=>{m(y=>[...y,...t].slice(-200))},[]),T=p.useCallback(()=>{I([]),n([]),m([])},[]),_=[{id:"can",label:"CAN Bus",icon:L},{id:"gpio",label:"GPIO",icon:W},{id:"interrupt",label:"Interrupts",icon:E}];return e.jsxs(K,{title:"在线编译",backTo:"/autosar",children:[e.jsxs($,{children:[e.jsx("title",{children:"在线编译器 - AutoSAR DevHub - YuleTech"}),e.jsx("meta",{name:"description",content:"AutoSAR 在线编译器与运行时仿真环境，支持 CAN/DIO/SPI/MCU 仿真可视化。"})]}),e.jsxs("div",{className:"py-6",children:[e.jsxs(v.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"mb-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium",children:[e.jsx(te,{className:"w-3.5 h-3.5"}),"Online Compiler"]}),e.jsx("span",{className:"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium",children:"Simulation Mode"})]}),e.jsxs("h1",{className:"text-3xl font-bold tracking-tight mb-2",children:["AutoSAR ",e.jsx("span",{className:"text-gradient-accent",children:"在线编译器"})]}),e.jsx("p",{className:"text-sm text-muted-foreground max-w-2xl",children:"Write, compile, and simulate AutoSAR C code directly in your browser. Monitor CAN bus traffic, GPIO waveforms, and interrupt activity in real-time."})]}),e.jsxs("div",{className:"flex flex-col md:flex-row gap-4",children:[e.jsx("div",{className:"flex-1 md:flex-[3]",children:e.jsx(v.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.1},className:"rounded-xl border border-border bg-card overflow-hidden",style:{height:"calc(100vh - 200px)",minHeight:"600px"},children:e.jsx(ue,{onCanMessages:g,onGpioEvents:c,onInterrupts:u,initialExampleId:i})})}),e.jsx("div",{className:"flex-1 md:flex-[2]",children:e.jsxs(v.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:.2},className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h2",{className:"text-sm font-semibold text-foreground",children:"Runtime Visualization"}),e.jsx("button",{onClick:T,className:"text-[10px] px-2 py-1 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 transition-colors",children:"Clear All"})]}),e.jsx("div",{className:"flex gap-1 overflow-x-auto",children:_.map(t=>{const y=t.id==="can"?"🚍":t.id==="gpio"?"📊":"⚡";return e.jsxs("button",{onClick:()=>f(t.id),className:`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors ${r===t.id?"bg-primary/10 text-primary font-medium":"text-muted-foreground hover:text-foreground hover:bg-muted/30"}`,children:[y," ",t.label]},t.id)})}),e.jsxs("div",{className:"space-y-4",children:[r==="can"&&e.jsx(v.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},children:e.jsx(pe,{messages:h})},"can"),r==="gpio"&&e.jsx(v.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},children:e.jsx(fe,{events:o})},"gpio"),r==="interrupt"&&e.jsx(v.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},children:e.jsx(_e,{events:C})},"interrupt")]}),e.jsxs("div",{className:"grid grid-cols-3 gap-2",children:[e.jsxs("div",{className:"p-2.5 rounded-lg bg-card border border-border text-center",children:[e.jsx("div",{className:"text-lg font-bold text-primary",children:h.length}),e.jsx("div",{className:"text-[10px] text-muted-foreground",children:"CAN Msgs"})]}),e.jsxs("div",{className:"p-2.5 rounded-lg bg-card border border-border text-center",children:[e.jsx("div",{className:"text-lg font-bold text-green-500",children:o.length}),e.jsx("div",{className:"text-[10px] text-muted-foreground",children:"GPIO Events"})]}),e.jsxs("div",{className:"p-2.5 rounded-lg bg-card border border-border text-center",children:[e.jsx("div",{className:"text-lg font-bold text-amber-500",children:C.length}),e.jsx("div",{className:"text-[10px] text-muted-foreground",children:"IRQs"})]})]})]})})]})]})]})}export{Se as SandboxPage};
