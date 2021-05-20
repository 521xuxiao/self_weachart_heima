//Page Object
import {request1} from "../../request/request.js";
import regeneratorRuntime from "../../libs/runtime/runtime.js";
Page({
    data: {
        leftMenu: [],
        rightMenu: [],
        currentIndex: 0,
        res: {},
        scrollTop: -1
    },
    //options(Object)
    onLoad: function(options) {
        let leftMenu = wx.getStorageSync("leftMenu");
        let rightMenu = wx.getStorageSync("rightMenu");
        let res = wx.getStorageSync("res");
        if(leftMenu && leftMenu.length) {
            this.setData({
                leftMenu, rightMenu, res
            })
        }else{
            this.initData();
        }
    },

    async initData() {
        let res = await request1("api/public/v1/categories");
        let leftMenu = res.message.map(item=>item.cat_name);
        let rightMenu = res.message[0].children;
        this.setData({
            leftMenu,rightMenu,res
        })
        wx.setStorageSync("leftMenu", leftMenu);
        wx.setStorageSync("rightMenu", rightMenu);
        wx.setStorageSync("res", res);
    },

    handleLeftMenu(e) {
        // console.log(e.currentTarget.dataset.index);
        if(this.data.currentIndex != e.currentTarget.dataset.index) {
            let rightMenu = this.data.res.message[e.currentTarget.dataset.index].children;
            this.setData({
                currentIndex: e.currentTarget.dataset.index,
                rightMenu,
                scrollTop: (e.currentTarget.dataset.index * 78) + "rpx"
            })
        }
    },

    navigate(e) {
        let params = JSON.stringify(e.currentTarget.dataset.params);
        wx.navigateTo({
            url: '/pages/goods_list/index?params='+params
        });
    },

    onReady: function() {
       
    },
    onShow: ()=> {
        
    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item) {

    }
});
  