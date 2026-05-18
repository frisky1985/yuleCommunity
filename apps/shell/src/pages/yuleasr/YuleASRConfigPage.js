import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    Save, 
    Play, 
    Download, 
    Share2, 
    Settings,
    Mic,
    Cpu,
    MemoryStick,
    Wifi,
    ChevronDown,
    AlertCircle,
    CheckCircle2,
    GitBranch,
    History
} from 'lucide-react';

export function YuleASRConfigPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState('general');
    const [showPreview, setShowPreview] = useState(false);

    // 模拟加载配置
    useEffect(() => {
        // 实际项目应调用 API
        const mockConfig = {
            id,
            name: '新建配置',
            description: '',
            platform: 'i.MX8',
            version: '1.0.0',
            settings: {
                // 基础配置
                language: 'zh-CN',
                sampleRate: 16000,
                audioFormat: 'PCM',
                // 识别引擎
                engine: {
                    type: 'embedded',
                    modelSize: 'medium',
                    enableVAD: true,
                    vadThreshold: 0.5,
                    silenceTimeout: 500
                },
                // 端点配置
                endpoint: {
                    type: 'websocket',
                    url: 'ws://localhost:8080/asr',
                    authToken: '',
                    reconnectInterval: 3000
                },
                // 高级选项
                advanced: {
                    enableNoiseReduction: true,
                    enableEchoCancellation: false,
                    customDictionary: '',
                    hotWords: [],
                    confidenceThreshold: 0.7
                }
            }
        };

        setTimeout(() => {
            setConfig(mockConfig);
            setLoading(false);
        }, 300);
    }, [id]);

    const handleSave = async () => {
        setSaving(true);
        // 实际项目应调用 API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
        alert('配置已保存');
    };

    const handleBuild = () => {
        navigate(`/yuleasr/build/${id}`);
    };

    const updateConfig = (section, key, value) => {
        setConfig(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                [section]: {
                    ...prev.settings[section],
                    [key]: value
                }
            }
        }));
    };

    if (loading) {
        return _jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center", children: [
            _jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" }),
            _jsx("span", { className: "ml-3 text-muted-foreground", children: "加载配置..." })
        ]});
    }

    const sections = [
        { id: 'general', label: '基础配置', icon: Settings },
        { id: 'engine', label: '识别引擎', icon: Mic },
        { id: 'endpoint', label: '端点配置', icon: Wifi },
        { id: 'advanced', label: '高级选项', icon: Cpu },
    ];

    return _jsxs("div", { className: "min-h-screen bg-background", children: [
        // Header
        _jsx("header", { className: "sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border", children:
            _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
                _jsxs("div", { className: "flex items-center justify-between h-16", children: [
                    _jsxs("div", { className: "flex items-center gap-4", children: [
                        _jsx("button", { 
                            onClick: () => navigate('/yuleasr'),
                            className: "p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors",
                            children: _jsx(ArrowLeft, { className: "w-5 h-5" })
                        }),
                        _jsxs("div", { children: [
                            _jsxs("div", { className: "flex items-center gap-2", children: [
                                _jsx("input", { 
                                    type: "text",
                                    value: config.name,
                                    onChange: (e) => setConfig({ ...config, name: e.target.value }),
                                    className: "text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0 p-0",
                                    placeholder: "配置名称"
                                }),
                                _jsxs("span", { className: "px-2 py-0.5 text-xs bg-muted rounded", children: ["v", config.version] })
                            ]}),
                            _jsx("input", { 
                                type: "text",
                                value: config.description,
                                onChange: (e) => setConfig({ ...config, description: e.target.value }),
                                className: "text-sm text-muted-foreground bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-full",
                                placeholder: "添加描述..."
                            })
                        ]})
                    ]}),
                    _jsxs("div", { className: "flex items-center gap-3", children: [
                        _jsxs("button", { 
                            onClick: handleSave,
                            disabled: saving,
                            className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50",
                            children: [
                                saving ? _jsx("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : _jsx(Save, { className: "w-4 h-4" }),
                                saving ? "保存中..." : "保存"
                            ]
                        }),
                        _jsxs("button", { 
                            onClick: handleBuild,
                            className: "inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors",
                            children: [_jsx(Play, { className: "w-4 h-4" }), "构建"]
                        }),
                        _jsxs("button", { 
                            className: "inline-flex items-center gap-2 bg-muted text-foreground px-4 py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors",
                            children: [_jsx(Download, { className: "w-4 h-4" }), "导出"]
                        }),
                        _jsx("button", { 
                            className: "p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors",
                            children: _jsx(Share2, { className: "w-5 h-5" })
                        })
                    ]})
                ]})
            ]})
        }),

        // Main Content
        _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
            _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [
                // Sidebar
                _jsx("div", { className: "lg:col-span-1", children:
                    _jsx("nav", { className: "space-y-1", children:
                        sections.map(section => {
                            const Icon = section.icon;
                            return _jsxs("button", {
                                key: section.id,
                                onClick: () => setActiveSection(section.id),
                                className: `w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left ${
                                    activeSection === section.id 
                                        ? 'bg-primary/10 text-primary' 
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`,
                                children: [
                                    _jsx(Icon, { className: "w-5 h-5" }),
                                    section.label
                                ]
                            });
                        })
                    })
                }),

                // Config Form
                _jsxs("div", { className: "lg:col-span-3 space-y-6", children: [
                    // 基础配置
                    activeSection === 'general' && _jsxs(_Fragment, { children: [
                        _jsx("div", { className: "bg-card border border-border rounded-xl p-6", children:
                            _jsxs("div", { className: "space-y-6", children: [
                                _jsx("h2", { className: "text-lg font-semibold", children: "基础配置" }),
                                _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                                    _jsxs("div", { children: [
                                        _jsx("label", { className: "block text-sm font-medium mb-2", children: "目标平台" }),
                                        _jsxs("select", { 
                                            value: config.platform,
                                            onChange: (e) => setConfig({ ...config, platform: e.target.value }),
                                            className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                                            children: [
                                                _jsx("option", { value: "i.MX8", children: "NXP i.MX8" }),
                                                _jsx("option", { value: "S32K", children: "NXP S32K" }),
                                                _jsx("option", { value: "TC3xx", children: "Infineon AURIX TC3xx" }),
                                                _jsx("option", { value: "RH850", children: "Renesas RH850" })
                                            ]
                                        })
                                    ]}),
                                    _jsxs("div", { children: [
                                        _jsx("label", { className: "block text-sm font-medium mb-2", children: "语言" }),
                                        _jsxs("select", { 
                                            value: config.settings.language,
                                            onChange: (e) => setConfig({ ...config, settings: { ...config.settings, language: e.target.value } }),
                                            className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                                            children: [
                                                _jsx("option", { value: "zh-CN", children: "中文 (简体)" }),
                                                _jsx("option", { value: "zh-TW", children: "中文 (繁体)" }),
                                                _jsx("option", { value: "en-US", children: "English (US)" }),
                                                _jsx("option", { value: "ja-JP", children: "日本語" })
                                            ]
                                        })
                                    ]}),
                                    _jsxs("div", { children: [
                                        _jsx("label", { className: "block text-sm font-medium mb-2", children: "采样率" }),
                                        _jsxs("select", { 
                                            value: config.settings.sampleRate,
                                            onChange: (e) => setConfig({ ...config, settings: { ...config.settings, sampleRate: parseInt(e.target.value) } }),
                                            className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                                            children: [
                                                _jsx("option", { value: 8000, children: "8 kHz" }),
                                                _jsx("option", { value: 16000, children: "16 kHz" }),
                                                _jsx("option", { value: 44100, children: "44.1 kHz" })
                                            ]
                                        })
                                    ]}),
                                    _jsxs("div", { children: [
                                        _jsx("label", { className: "block text-sm font-medium mb-2", children: "音频格式" }),
                                        _jsxs("select", { 
                                            value: config.settings.audioFormat,
                                            onChange: (e) => setConfig({ ...config, settings: { ...config.settings, audioFormat: e.target.value } }),
                                            className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                                            children: [
                                                _jsx("option", { value: "PCM", children: "PCM" }),
                                                _jsx("option", { value: "WAV", children: "WAV" }),
                                                _jsx("option", { value: "OPUS", children: "OPUS" })
                                            ]
                                        })
                                    ]})
                                ]})
                            ]})
                        }),
                        _jsx("div", { className: "bg-card border border-border rounded-xl p-6", children:
                            _jsxs("div", { className: "space-y-6", children: [
                                _jsxs("div", { className: "flex items-center justify-between", children: [
                                    _jsx("h2", { className: "text-lg font-semibold", children: "预览" }),
                                    _jsxs("button", { 
                                        onClick: () => setShowPreview(!showPreview),
                                        className: "text-sm text-primary hover:underline",
                                        children: showPreview ? "隐藏" : "显示"
                                    })
                                ]}),
                                showPreview && _jsxs("div", { className: "bg-muted rounded-lg p-4", children: [
                                    _jsx("pre", { className: "text-sm overflow-x-auto", children: JSON.stringify(config, null, 2) })
                                ]})
                            ]})
                        })
                    ]}),

                    // 识别引擎配置
                    activeSection === 'engine' && _jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
                        _jsx("h2", { className: "text-lg font-semibold mb-6", children: "识别引擎配置" }),
                        _jsxs("div", { className: "space-y-6", children: [
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-sm font-medium mb-2", children: "引擎类型" }),
                                _jsxs("select", { 
                                    value: config.settings.engine.type,
                                    onChange: (e) => updateConfig('engine', 'type', e.target.value),
                                    className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                                    children: [
                                        _jsx("option", { value: "embedded", children: "嵌入式引擎 (本地)" }),
                                        _jsx("option", { value: "cloud", children: "云端引擎" }),
                                        _jsx("option", { value: "hybrid", children: "混合模式" })
                                    ]
                                })
                            ]}),
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-sm font-medium mb-2", children: "模型大小" }),
                                _jsxs("select", { 
                                    value: config.settings.engine.modelSize,
                                    onChange: (e) => updateConfig('engine', 'modelSize', e.target.value),
                                    className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                                    children: [
                                        _jsx("option", { value: "small", children: "Small (低资源占用)" }),
                                        _jsx("option", { value: "medium", children: "Medium (平衡)" }),
                                        _jsx("option", { value: "large", children: "Large (高精度)" })
                                    ]
                                })
                            ]}),
                            _jsxs("div", { className: "flex items-center justify-between py-4 border-t border-border", children: [
                                _jsxs("div", { children: [
                                    _jsx("label", { className: "block text-sm font-medium", children: "启用 VAD" }),
                                    _jsx("p", { className: "text-sm text-muted-foreground", children: "语音活动检测，自动切分语音段" })
                                ]}),
                                _jsx("button", { 
                                    onClick: () => updateConfig('engine', 'enableVAD', !config.settings.engine.enableVAD),
                                    className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        config.settings.engine.enableVAD ? 'bg-primary' : 'bg-muted'
                                    }`,
                                    children: _jsx("span", { 
                                        className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            config.settings.engine.enableVAD ? 'translate-x-6' : 'translate-x-1'
                                        }` 
                                    })
                                })
                            ]}),
                            config.settings.engine.enableVAD && _jsxs("div", { children: [
                                _jsx("label", { className: "block text-sm font-medium mb-2", children: "VAD 阈值" }),
                                _jsxs("div", { className: "flex items-center gap-4", children: [
                                    _jsx("input", { 
                                        type: "range",
                                        min: "0",
                                        max: "1",
                                        step: "0.1",
                                        value: config.settings.engine.vadThreshold,
                                        onChange: (e) => updateConfig('engine', 'vadThreshold', parseFloat(e.target.value)),
                                        className: "flex-1"
                                    }),
                                    _jsx("span", { className: "text-sm w-12", children: config.settings.engine.vadThreshold })
                                ]})
                            ]})
                        ]})
                    ]}),

                    // 端点配置
                    activeSection === 'endpoint' && _jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
                        _jsx("h2", { className: "text-lg font-semibold mb-6", children: "端点配置" }),
                        _jsxs("div", { className: "space-y-6", children: [
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-sm font-medium mb-2", children: "连接类型" }),
                                _jsxs("select", { 
                                    value: config.settings.endpoint.type,
                                    onChange: (e) => updateConfig('endpoint', 'type', e.target.value),
                                    className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                                    children: [
                                        _jsx("option", { value: "websocket", children: "WebSocket" }),
                                        _jsx("option", { value: "http", children: "HTTP REST" }),
                                        _jsx("option", { value: "grpc", children: "gRPC" })
                                    ]
                                })
                            ]}),
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-sm font-medium mb-2", children: "服务端地址" }),
                                _jsx("input", { 
                                    type: "text",
                                    value: config.settings.endpoint.url,
                                    onChange: (e) => updateConfig('endpoint', 'url', e.target.value),
                                    className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                                    placeholder: "ws://localhost:8080/asr"
                                })
                            ]}),
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-sm font-medium mb-2", children: "认证 Token (可选)" }),
                                _jsx("input", { 
                                    type: "password",
                                    value: config.settings.endpoint.authToken,
                                    onChange: (e) => updateConfig('endpoint', 'authToken', e.target.value),
                                    className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                                    placeholder: "输入认证 token"
                                })
                            ]}),
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-sm font-medium mb-2", children: "重连间隔 (ms)" }),
                                _jsx("input", { 
                                    type: "number",
                                    value: config.settings.endpoint.reconnectInterval},
                                    { onChange: (e) => updateConfig('endpoint', 'reconnectInterval', parseInt(e.target.value))},
                                    { className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" }
                                )
                            ]})
                        ]})
                    ]}),

                    // 高级选项
                    activeSection === 'advanced' && _jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
                        _jsx("h2", { className: "text-lg font-semibold mb-6", children: "高级选项" }),
                        _jsxs("div", { className: "space-y-6", children: [
                            _jsxs("div", { className: "flex items-center justify-between py-4 border-b border-border", children: [
                                _jsxs("div", { children: [
                                    _jsx("label", { className: "block text-sm font-medium", children: "启用降噪" }),
                                    _jsx("p", { className: "text-sm text-muted-foreground", children: "减少环境噪声干扰" })
                                ]}),
                                _jsx("button", { 
                                    onClick: () => updateConfig('advanced', 'enableNoiseReduction', !config.settings.advanced.enableNoiseReduction),
                                    className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        config.settings.advanced.enableNoiseReduction ? 'bg-primary' : 'bg-muted'
                                    }`,
                                    children: _jsx("span", { 
                                        className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            config.settings.advanced.enableNoiseReduction ? 'translate-x-6' : 'translate-x-1'
                                        }` 
                                    })
                                })
                            ]}),
                            _jsxs("div", { className: "flex items-center justify-between py-4 border-b border-border", children: [
                                _jsxs("div", { children: [
                                    _jsx("label", { className: "block text-sm font-medium", children: "启用回声消除" }),
                                    _jsx("p", { className: "text-sm text-muted-foreground", children: "适用于通信场景" })
                                ]}),
                                _jsx("button", { 
                                    onClick: () => updateConfig('advanced', 'enableEchoCancellation', !config.settings.advanced.enableEchoCancellation),
                                    className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        config.settings.advanced.enableEchoCancellation ? 'bg-primary' : 'bg-muted'
                                    }`,
                                    children: _jsx("span", { 
                                        className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            config.settings.advanced.enableEchoCancellation ? 'translate-x-6' : 'translate-x-1'
                                        }` 
                                    })
                                })
                            ]}),
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-sm font-medium mb-2", children: "置信度阈值" }),
                                _jsxs("div", { className: "flex items-center gap-4", children: [
                                    _jsx("input", { 
                                        type: "range",
                                        min: "0",
                                        max: "1",
                                        step: "0.05",
                                        value: config.settings.advanced.confidenceThreshold,
                                        onChange: (e) => updateConfig('advanced', 'confidenceThreshold', parseFloat(e.target.value)),
                                        className: "flex-1"
                                    }),
                                    _jsx("span", { className: "text-sm w-12", children: config.settings.advanced.confidenceThreshold })
                                ]}),
                                _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "只有置信度高于阈值的结果才会返回" })
                            ]}),
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-sm font-medium mb-2", children: "热词 (每行一个)" }),
                                _jsx("textarea", { 
                                    value: config.settings.advanced.hotWords.join('\n'),
                                    onChange: (e) => updateConfig('advanced', 'hotWords', e.target.value.split('\n').filter(w => w.trim())),
                                    className: "w-full h-32 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                                    placeholder: "输入热词，每行一个..."
                                })
                            ]})
                        ]})
                    ]})
                ]})
            ]})
        ]})
    ]});
}
