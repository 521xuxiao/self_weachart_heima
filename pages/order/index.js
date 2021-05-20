// pages/order/index.js
import { request1 } from "../../request/request";
import regeneratorRuntime from "../../libs/runtime/runtime.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        giveTab: [{name: "全部订单", id: 1}, {name: "代付款", id: 2}, 
            {name: "待收货", id: 3},{name: "退货/退款", id: 4}],
        currentPage: 0,
        pageSize: 10,
        pageNum: 1,
        pageTotal: 0,
        isMoreData: true,
        dataSource: [],

        refresherTriggered: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const curPages =  getCurrentPages();
        const {type} = curPages[curPages.length-1].options;
        this.setData({currentPage: type});
        this.initData(this.data.pageNum);
    },
    async initData(currentPage) {
        let res = await request1("api/public/v1/goods/search?pagenum="+currentPage+"&pagesize="+this.data.pageSize);
        //console.log(res.message);   // goods   total
        this.setData({
            dataSource: [...this.data.dataSource, ...res.message.goods],
            pageTotal: res.message.total,
            refresherTriggered: false,
            isMoreData: true
        });
    },

    tabCurrent(e) {
        const {detail} = e;
        this.setData({currentPage:detail});
    },


    /**
     * 上拉加载数据
     */
    scrolltolower() {
        if(!this.data.isMoreData) {
            return;
        }
        let {pageTotal, pageSize, pageNum} = this.data;
        console.log(pageTotal, pageSize, pageNum);
        pageNum = ++pageNum;
        this.setData({pageNum, isMoreData: false});
        if(pageTotal > pageSize * (pageNum - 1)) {
            this.initData(pageNum);
        }
    },

    /**
     * 下拉刷新
     */
    refresherrefresh() {
        this.setData({dataSource: [], pageNum: 1})
        this.initData(1);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})