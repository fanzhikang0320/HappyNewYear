// pages/index/index.js
Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    hundred: - 0* 134,
    decade:  - 0 * 134,
    units: - 0 * 136,
    hour:99,
    minute:99,
    second:99,
    isOpen: true, //默认不显示开启祝福按钮
    isShowLoading: true, //录音时，是否展示loading区域
  },
  
  timeout: null,
  audioContext:null,
  /**思路：
   * 按下后开启录音,显示相应的loading
   * 松开将录音发送至后台，加载loading
   * 后台返回结果
   * 显示结果
   * 正确跳转，错误重新
   */
  count:0,
  /**
   * 触摸开始事件
   */
  start () {
    let that = this;
    this.setData({
      isShowLoading: false
    });
   
    this.audioContext.play(); //播放音频

  //录音时间达到20s的时候出发关闭事件
    this.timeout = setTimeout(function () {
      that.end(); //调用结束事件
      wx.showToast({
        title: '录音时间过长',
        duration: 2000,
        icon:'none'
      })
    },20000);
  },

/**
 * 触摸结束事件
 * 清理定时器
 * 隐藏语音loading
 * 显示正在分析loading
 */
  end () {
    clearTimeout(this.timeout);
    this.audioContext.stop(); //暂停音频
    let that = this;
    that.setData({
      isShowLoading: true
    });
    wx.showLoading({
      title: '正在分析...'
    })
    //延迟2500ms显示分析成功loading，隐藏loading背景
    this.endTimeout = setTimeout(function () {
      wx.hideLoading();
      // 当用户语音第二次才让成功
      if (that.count == 1) {
        wx.showToast({
          title: '新年快乐!',
          duration: 1500,
          success: function () {
            wx.redirectTo({
              url: '/pages/bless/bless'
            })
          }
        })
      } else {
        wx.showToast({
          title: '请重新尝试',
          duration:1000,
          icon:'none',
          success: function () {
            that.count++;
          }
        })
      }
    },2000)
  },


  contentIndex: 0,  //随机切换话语，图片索引
  /**
   * 点击期待按钮
   */
  close () {
    let that = this;
    let contentList = ['(*╹▽╹*)~亲', ' (;￢＿￢)呃..','ヽ(。>д<)ｐ哼!'];
    wx.showToast({
      title: contentList[that.contentIndex % 3],
      icon:'none',
      duration:1500,
      mask:false
    });
    this.contentIndex ++;
  },

  /**
   * 计算时间
   */
  time () {
    let that = this;
    let endTime = new Date('2020/01/25 00:00:00').getTime();  //获取指定结束时间的时间戳
    let date = new Date();
    let time = date.getTime(); //获取当前时间戳
    let remainDay, remainHour, remianMinute, remianSecond ,d, h, m;

    let allTime = endTime - time;//获取剩余总的时间

    if (allTime > 0) {
      remainDay = parseInt(allTime / (60 * 60 * 24 * 1000));//剩余整的天数（除了当天不计算在内）

      d = parseInt(allTime) - parseInt(remainDay * 60 * 60 * 24 * 1000);//剩余不足一天的毫秒数
      remainHour = parseInt(d / (60 * 60 * 1000)); // 将不足一天的毫秒数转化为剩余的小时数（不足一小时的不算）

      h = d - remainHour * 60 * 60 * 1000; //得到剩余不足一小时的毫秒数
      remianMinute = parseInt(h / (60 * 1000));//将不足一小时的毫秒树转换为剩余的分钟数（不足一分钟的不算）

      remianSecond = parseInt((allTime - remainDay * 24 * 60 * 60 * 1000 - remainHour * 60 * 60 * 1000 - remianMinute * 60 * 1000) / 1000); //将不足一分钟的转化为毫秒数（不满一分钟的秒数）

      let hundredNum = Math.floor(remainDay / 100); //得到百位显示的数字
      let decadeNum = Math.floor(remainDay % 100 / 10); //得到十位显示的数字
      let unitsNum = Math.floor(remainDay % 100 % 10);//得到个位显示的数字

      that.setData({
        hour: remainHour < 10 ? '0' + remainHour : remainHour,
        minute: remianMinute >= 10 ? remianMinute : '0' + remianMinute,
        second: remianSecond >= 10 ? remianSecond : '0' + remianSecond,
        hundred: -hundredNum * 134,
        decade: -decadeNum * 134,
        units: -unitsNum * 136
      });

      setTimeout(that.time,1000);
    } else {
      // 当前的时间戳等于结束时的时间戳
      //时间归0，切换开启祝福按钮

      that.setData({
        hour:0,
        minute:0,
        second:0,
        isOpen: false,
      })
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.audioContext = wx.createInnerAudioContext(),//创建全局audio对象
    this.audioContext.src = '/source/open.mp3';
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
    this.time();
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
    clearTimeout(this.endTimeout)
  },

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:'新春祝福请查收！', imageUrl:'http://img.588ku.com/gif/19/12/10/619d31bee0c02d43453bad9d561d619c.gif!qk277',
      path:'/pages/index/index'
    }
  }
})