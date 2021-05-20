import {request1} from "../../request/request.js";
import regeneratorRuntime from "../../libs/runtime/runtime.js";
// pages/goods_list/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageNum: 1,
        pageSize: 10,
        tabList:[{id: '1', name: '综合'}, {id: '2', name: '销量'}, {id: '3', name: '价格'}],
        currentPage: 0,
        goodsList: [],
        pageTotal: 1,

        params: {},
        isRefresher: true
    },
    isGetData: true,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initData(JSON.parse(options.params), this.data.pageNum);
        this.setData({
            params: JSON.parse(options.params)
        })
    },

    async initData(params,pageNum) {
        let res = await request1("api/public/v1/goods/search?cid="+params.cat_id+"&pagenum="+pageNum+"&pagesize="+this.data.pageSize);
        console.log(res.message); // total   goods

        this.setData({
            goodsList: [...this.data.goodsList, ...res.message.goods],
            pageTotal: res.message.total,
            isRefresher: false
        })
        this.isGetData = true;
    },

    /**
     * Tab组件传过来的参数
     */
    tabCurrents(e) {
        // console.log(e.detail);
        this.setData({
            currentPage: e.detail
        })
    },

    /**
     * 上拉加载  滚动到底部触发的事件
     */
    scrollMore(e) {
        if(!this.isGetData)
            return;
        this.isGetData = false;
        let {pageNum} = this.data;
        let currentPage1= ++pageNum;
        this.setData({
            pageNum: currentPage1
        })
        if(this.data.pageTotal > (this.data.pageNum -1) * this.data.pageSize) {
            this.initData(this.data.params, this.data.pageNum);
        }
    },

    /**
     * 下拉刷新
     */
    refresh() {
        this.setData({
            pageNum: 1,
            goodsList: []
        })
        this.initData(this.data.params, this.data.pageNum);
    },

    /**
     * 列表条详情的页面
     */
    toDetails(e) {
        const {id} = e.currentTarget.dataset;
        wx.navigateTo({
            url: '/pages/goods_details/index?id='+id
        });
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