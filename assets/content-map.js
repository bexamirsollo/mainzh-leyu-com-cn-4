// 内容地图模块 - 站点内容分区与检索功能
(function() {
    'use strict';

    // 配置数据: 站点基础信息和内容分区
    const SITE_CONFIG = {
        baseUrl: 'https://mainzh-leyu.com.cn',
        sections: [
            {
                id: 'home',
                name: '首页',
                description: '乐鱼体育官方首页，提供最新赛事推荐和优惠活动。',
                tags: ['乐鱼体育', '首页', '赛事', '活动'],
                url: 'https://mainzh-leyu.com.cn'
            },
            {
                id: 'sports',
                name: '体育赛事',
                description: '覆盖足球、篮球、网球等主流体育项目，实时更新赔率与比分。',
                tags: ['乐鱼体育', '足球', '篮球', '网球', '赔率'],
                url: 'https://mainzh-leyu.com.cn/sports'
            },
            {
                id: 'live',
                name: '直播',
                description: '高清直播流，支持多视角切换，与乐鱼体育社区互动。',
                tags: ['乐鱼体育', '直播', '高清', '互动'],
                url: 'https://mainzh-leyu.com.cn/live'
            },
            {
                id: 'promotions',
                name: '优惠活动',
                description: '乐鱼体育专属优惠，新手礼包、充值返现等限时活动。',
                tags: ['乐鱼体育', '优惠', '活动', '礼包'],
                url: 'https://mainzh-leyu.com.cn/promotions'
            },
            {
                id: 'help',
                name: '帮助中心',
                description: '常见问题解答、账户安全与提现指南。',
                tags: ['乐鱼体育', '帮助', '问题', '提现'],
                url: 'https://mainzh-leyu.com.cn/help'
            }
        ]
    };

    // 关键词标签集（用于搜索匹配）
    const KEYWORD_INDEX = SITE_CONFIG.sections.reduce(function(index, section) {
        section.tags.forEach(function(tag) {
            if (!index[tag]) {
                index[tag] = [];
            }
            index[tag].push(section.id);
        });
        return index;
    }, {});

    // 搜索过滤函数 - 根据关键词查找匹配的内容分区
    function searchSections(query) {
        if (!query || typeof query !== 'string') {
            return [];
        }

        var trimmed = query.trim().toLowerCase();
        if (trimmed === '') {
            return [];
        }

        var matchedIds = new Set();
        
        // 直接匹配标签
        Object.keys(KEYWORD_INDEX).forEach(function(tag) {
            if (tag.toLowerCase().indexOf(trimmed) !== -1) {
                KEYWORD_INDEX[tag].forEach(function(id) {
                    matchedIds.add(id);
                });
            }
        });

        // 匹配分区名称和描述
        SITE_CONFIG.sections.forEach(function(section) {
            if (section.name.toLowerCase().indexOf(trimmed) !== -1 ||
                section.description.toLowerCase().indexOf(trimmed) !== -1) {
                matchedIds.add(section.id);
            }
        });

        // 返回完整的分区对象数组
        return SITE_CONFIG.sections.filter(function(section) {
            return matchedIds.has(section.id);
        });
    }

    // 获取所有内容分区
    function getAllSections() {
        return SITE_CONFIG.sections.slice(); // 返回副本
    }

    // 获取某个标签下的所有分区
    function getSectionsByTag(tag) {
        if (!tag || typeof tag !== 'string') {
            return [];
        }
        var lowerTag = tag.trim().toLowerCase();
        var ids = KEYWORD_INDEX[lowerTag];
        if (!ids) {
            return [];
        }
        return SITE_CONFIG.sections.filter(function(section) {
            return ids.indexOf(section.id) !== -1;
        });
    }

    // 导出公共接口（支持浏览器和Node环境）
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            config: SITE_CONFIG,
            search: searchSections,
            getAll: getAllSections,
            getByTag: getSectionsByTag
        };
    } else if (typeof window !== 'undefined') {
        window.ContentMap = {
            config: SITE_CONFIG,
            search: searchSections,
            getAll: getAllSections,
            getByTag: getSectionsByTag
        };
    }
})();