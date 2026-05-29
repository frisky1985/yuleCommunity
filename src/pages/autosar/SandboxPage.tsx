import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Code2, Radio, Activity, Zap } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { DevHubLayout } from '../../components/autosar/DevHubLayout';
import { Sandbox } from '../../components/autosar/Sandbox';
import { CanBusPanel } from '../../components/autosar/CanBusPanel';
import { GpioWaveform } from '../../components/autosar/GpioWaveform';
import { InterruptTimeline } from '../../components/autosar/InterruptTimeline';
import { SANDBOX_EXAMPLES } from '../../data/autosar/sandbox-examples';
import type { CanMessage } from '../../components/autosar/CanBusPanel';
import type { GpioEvent } from '../../components/autosar/GpioWaveform';
import type { InterruptEvent } from '../../components/autosar/InterruptTimeline';

type VisualizationTab = 'can' | 'gpio' | 'interrupt';

function findExampleIdForApiName(apiName: string): string | undefined {
  const lowerName = apiName.toLowerCase();
  // Try direct match by checking if any example code contains the API name
  const match = SANDBOX_EXAMPLES.find(ex => ex.code.toLowerCase().includes(lowerName));
  return match?.id;
}

export function SandboxPage() {
  const [searchParams] = useSearchParams();
  const exampleParam = searchParams.get('example');
  const initialExampleId = exampleParam ? findExampleIdForApiName(exampleParam) : undefined;
  const [canMessages, setCanMessages] = useState<CanMessage[]>([]);
  const [gpioEvents, setGpioEvents] = useState<GpioEvent[]>([]);
  const [interrupts, setInterrupts] = useState<InterruptEvent[]>([]);
  const [visualTab, setVisualTab] = useState<VisualizationTab>('can');

  const handleCanMessages = useCallback((msgs: CanMessage[]) => {
    setCanMessages(prev => [...prev, ...msgs].slice(-500));
  }, []);

  const handleGpioEvents = useCallback((events: GpioEvent[]) => {
    setGpioEvents(prev => [...prev, ...events].slice(-200));
  }, []);

  const handleInterrupts = useCallback((events: InterruptEvent[]) => {
    setInterrupts(prev => [...prev, ...events].slice(-200));
  }, []);

  const clearAll = useCallback(() => {
    setCanMessages([]);
    setGpioEvents([]);
    setInterrupts([]);
  }, []);

  const tabs: { id: VisualizationTab; label: string; icon: typeof Radio }[] = [
    { id: 'can', label: 'CAN Bus', icon: Radio },
    { id: 'gpio', label: 'GPIO', icon: Activity },
    { id: 'interrupt', label: 'Interrupts', icon: Zap },
  ];

  return (
    <DevHubLayout title="在线编译" backTo="/autosar">
      <Helmet>
        <title>在线编译器 - AutoSAR DevHub - YuleTech</title>
        <meta name="description" content="AutoSAR 在线编译器与运行时仿真环境，支持 CAN/DIO/SPI/MCU 仿真可视化。" />
      </Helmet>

      <div className="py-6">
        {/* Header badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium">
              <Code2 className="w-3.5 h-3.5" />
              Online Compiler
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
              Simulation Mode
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            AutoSAR <span className="text-gradient-accent">在线编译器</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Write, compile, and simulate AutoSAR C code directly in your browser.
            Monitor CAN bus traffic, GPIO waveforms, and interrupt activity in real-time.
          </p>
        </motion.div>

        {/* Main Layout: Editor Left, Visualization Right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 rounded-xl border border-border bg-card overflow-hidden"
            style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
          >
            <Sandbox
              onCanMessages={handleCanMessages}
              onGpioEvents={handleGpioEvents}
              onInterrupts={handleInterrupts}
              initialExampleId={initialExampleId}
            />
          </motion.div>

          {/* Visualization Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Clear button */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Runtime Visualization</h2>
              <button
                onClick={clearAll}
                className="text-[10px] px-2 py-1 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 p-1 rounded-xl bg-muted/30 border border-border">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setVisualTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                      visualTab === tab.id
                        ? 'bg-card text-foreground shadow-sm border border-border'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Visual Panels */}
            <div className="space-y-4">
              {visualTab === 'can' && (
                <motion.div
                  key="can"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CanBusPanel messages={canMessages} />
                </motion.div>
              )}

              {visualTab === 'gpio' && (
                <motion.div
                  key="gpio"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GpioWaveform events={gpioEvents} />
                </motion.div>
              )}

              {visualTab === 'interrupt' && (
                <motion.div
                  key="interrupt"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <InterruptTimeline events={interrupts} />
                </motion.div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-card border border-border text-center">
                <div className="text-lg font-bold text-primary">{canMessages.length}</div>
                <div className="text-[10px] text-muted-foreground">CAN Msgs</div>
              </div>
              <div className="p-2.5 rounded-lg bg-card border border-border text-center">
                <div className="text-lg font-bold text-green-500">{gpioEvents.length}</div>
                <div className="text-[10px] text-muted-foreground">GPIO Events</div>
              </div>
              <div className="p-2.5 rounded-lg bg-card border border-border text-center">
                <div className="text-lg font-bold text-amber-500">{interrupts.length}</div>
                <div className="text-[10px] text-muted-foreground">IRQs</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DevHubLayout>
  );
}
