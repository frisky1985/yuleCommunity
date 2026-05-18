import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Mic, 
    FileCode, 
    Users, 
    Cloud, 
    Settings, 
    Plus, 
    MoreVertical,
    Trash2,
    Download,
    Share2,
    GitBranch
} from 'lucide-react';

export function YuleASRPage() {
    const [configs, setConfigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('my-configs');
    const navigate = useNavigate();

    // 模拟加载配置数据
    useEffect(() => {
        // 实际项目中应该调用 API
        const mockConfigs = [
            {
                id: '1',
                name: 'i.MX8 语音识别配置',
                description: '用于 NXP i.MX8 平台的高级语音识别配置',
                platform: 'i.MX8',
                version: '2.1.0',
                updatedAt: '2024-01-15',
                isShared: false,
                team: null
            },
            {
                id: '2',
                name: 'S32K 车载语音配置',
                description: '车载系统语音控制配置',
                platform: 'S32K',
                version: '1.5.2',
                updatedAt: '2024-01-10',
                isShared: true,
                team: '汽车电子团队'
            }
        ];
        
        setTimeout(() => {
            setConfigs(mockConfigs);
            setLoading(false);
        }, 500);
    }, []);

    const handleCreateConfig = () => {
        const newId = Date.now().toString();
        navigate(`/yuleasr/config/${newId}`);
    };

    const handleEditConfig = (id) => {
        navigate(`/yuleasr/config/${id}`);
    };

    const handleDeleteConfig = (id) => {
        if (confirm('确定要删除此配置吗？')) {
            setConfigs(configs.filter(c => c.id !== id));
        }
    };

    return (
        _jsxs("div", { className: "min-h-screen bg-background", children: [
            // Hero Section
            _jsxs("section", { className: "relative py-20 overflow-hidden", children: [
                _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" }),
                _jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
                    _jsxs("div", { className: "text-center", children: [
                        _jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6", children:
                            _jsx(Mic, { className: "w-8 h-8 text-white" })
                        }),
                        _jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: "yuleASR 配置管理" }),
                        _jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto mb-8", children: "专为嵌入式系统设计的语音识别配置工具，支持多平台、团队协作、云端同步" }),
                        _jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
                            _jsxs("button", { 
                                onClick: handleCreateConfig,
                                className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors",
                                children: [_jsx(Plus, { className: "w-4 h-4" }), "新建配置"]
                            }),
                            _jsxs("a", { 
                                href: "/docs/yuleasr",
                                className: "inline-flex items-center gap-2 bg-muted text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted/80 transition-colors",
                                children: [_jsx(FileCode, { className: "w-4 h-4" }), "查看文档"]
                            })
                        ]})
                    ]})
                ]})
            ]}),

            // Features Section
            _jsx("section", { className: "py-16 border-y border-border", children:
                _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
                    _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
                        _jsxs("div", { className: "flex items-start gap-4", children: [
                            _jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children:
                                _jsx(Settings, { className: "w-5 h-5 text-primary" })
                            }),
                            _jsxs("div", { children: [
                                _jsx("h3", { className: "font-semibold mb-1", children: "可视化配置" }),
                                _jsx("p", { className: "text-sm text-muted-foreground", children: "Web 界面可视化编辑配置，支持实时预览和验证" })
                            ]})
                        ]}),
                        _jsxs("div", { className: "flex items-start gap-4", children: [
                            _jsx("div", { className: "w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0", children:
                                _jsx(Users, { className: "w-5 h-5 text-accent" })
                            }),
                            _jsxs("div", { children: [
                                _jsx("h3", { className: "font-semibold mb-1", children: "团队协作" }),
                                _jsx("p", { className: "text-sm text-muted-foreground", children: "支持配置共享、版本控制、审批流程" })
                            ]})
                        ]}),
                        _jsxs("div", { className: "flex items-start gap-4", children: [
                            _jsx("div", { className: "w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0", children:
                                _jsx(Cloud, { className: "w-5 h-5 text-success" })
                            }),
                            _jsxs("div", { children: [
                                _jsx("h3", { className: "font-semibold mb-1", children: "云端同步" }),
                                _jsx("p", { className: "text-sm text-muted-foreground", children: "配置文件云端备份，多设备同步" })
                            ]})
                        ]})
                    ]})
                ]})
            }),

            // Config List Section
            _jsx("section", { className: "py-16", children:
                _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
                    // Tabs
                    _jsxs("div", { className: "flex items-center gap-6 mb-8 border-b border-border", children: [
                        _jsx("button", { 
                            onClick: () => setActiveTab('my-configs'),
                            className: `pb-4 text-sm font-medium transition-colors relative ${activeTab === 'my-configs' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`,
                            children: _jsxs(_Fragment, { children: ["我的配置", configs.length > 0 && _jsx("span", { className: "ml-2 px-2 py-0.5 text-xs bg-muted rounded-full", children: configs.length })] })
                        }),
                        _jsx("button", { 
                            onClick: () => setActiveTab('shared'),
                            className: `pb-4 text-sm font-medium transition-colors relative ${activeTab === 'shared' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`,
                            children: "团队共享"
                        }),
                        _jsx("button", { 
                            onClick: () => setActiveTab('templates'),
                            className: `pb-4 text-sm font-medium transition-colors relative ${activeTab === 'templates' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`,
                            children: "配置模板"
                        })
                    ]}),

                    // Config List
                    loading ? (
                        _jsxs("div", { className: "text-center py-12", children: [
                            _jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" }),
                            _jsx("p", { className: "text-muted-foreground", children: "加载中..." })
                        ]})
                    ) : configs.length === 0 ? (
                        _jsxs("div", { className: "text-center py-16 bg-muted/50 rounded-xl", children: [
                            _jsx(Settings, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
                            _jsx("h3", { className: "text-lg font-medium mb-2", children: "还没有配置" }),
                            _jsx("p", { className: "text-muted-foreground mb-6", children: "创建你的第一个 yuleASR 配置" }),
                            _jsxs("button", { 
                                onClick: handleCreateConfig,
                                className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors",
                                children: [_jsx(Plus, { className: "w-4 h-4" }), "新建配置"]
                            })
                        ]})
                    ) : (
                        _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children:
                            configs.map(config => 
                                _jsxs("div", { 
                                    key: config.id,
                                    className: "group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer",
                                    onClick: () => handleEditConfig(config.id),
                                    children: [
                                        _jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                                            _jsxs("div", { className: "flex items-center gap-3", children: [
                                                _jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children:
                                                    _jsx(FileCode, { className: "w-5 h-5 text-primary" })
                                                }),
                                                _jsxs("div", { children: [
                                                    _jsx("h3", { className: "font-semibold line-clamp-1", children: config.name }),
                                                    _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                                                        _jsx("span", { children: config.platform }),
                                                        _jsx("span", { children: "·" }),
                                                        _jsxs("span", { children: ["v", config.version] })
                                                    ]})
                                                ]})
                                            ]}),
                                            _jsxs("div", { className: "relative", children: [
                                                _jsx("button", { 
                                                    className: "p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity",
                                                    onClick: (e) => e.stopPropagation(),
                                                    children: _jsx(MoreVertical, { className: "w-4 h-4" })
                                                })
                                            ]})
                                        ]}),
                                        _jsx("p", { className: "text-sm text-muted-foreground mb-4 line-clamp-2", children: config.description }),
                                        _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border", children: [
                                            _jsxs("div", { className: "flex items-center gap-3", children: [
                                                config.isShared && _jsx(Share2, { className: "w-4 h-4 text-accent" }),
                                                config.team && _jsxs("span", { className: "text-xs text-accent", children: [config.team] })
                                            ]}),
                                            _jsxs("div", { className: "flex items-center gap-2", children: [
                                                _jsxs("button", { 
                                                    className: "p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors",
                                                    onClick: (e) => { e.stopPropagation(); handleDeleteConfig(config.id); },
                                                    children: _jsx(Trash2, { className: "w-4 h-4" })
                                                }),
                                                _jsx("button", { 
                                                    className: "p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors",
                                                    onClick: (e) => e.stopPropagation(),
                                                    children: _jsx(Download, { className: "w-4 h-4" })
                                                })
                                            ]})
                                        ]})
                                    ]
                                })
                            )
                        })
                    )
                ]})
            })
        ]})
    );
}
