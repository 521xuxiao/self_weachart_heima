// components/Tab/Tab.js
Component({
    /**
     * 组件的属性列表
     */
    observers: {
        "currentPage": function(currentIndex) {
            this.setData({currentIndex});
        }
    },
    properties: {
        giveTabs: {
            type: Array,
            value: []
        },
        currentPage: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleItem(e) {
            let index = e.currentTarget.dataset.index;
            if(index !== this.data.currentIndex) {
                this.setData({
                    currentIndex: index
                });
                //通知goods_list组件
                this.triggerEvent("tabCurrent", index);
            }
        }
    }
})
