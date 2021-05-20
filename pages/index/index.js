// index.js
// 获取应用实例
const app = getApp()
import {request1} from "../../request/request.js";
Page({
    data: {
        imgPathList: [],
        navigateList: [],
        floorList: []
    },

    onLoad: function (options) {
        request1("api/public/v1/home/swiperdata").then((res)=>{
            this.setData({
                imgPathList: res.message
            })
        });
        request1("api/public/v1/home/catitems").then((res)=>{
            this.setData({
                navigateList: res.message
            })
        });
        request1("api/public/v1/home/floordata").then((res)=>{
            //console.log(res.message);   // floor_title.image_src   product_list[].image_src
            this.setData({
                floorList: res.message
            }) 
        })
    },

    onReady: function () {
        
    },

    onShow: function () {
        
    },

    onHide: function () {
        
    },

    onUnload: function () {
        
    },

    onPullDownRefresh: function () {
        
    },

    onReachBottom: function () {
        
    },

    onShareAppMessage: function () {
        
    }
})