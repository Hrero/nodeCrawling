/*
* api接口转编码数据中心
* */

module.exports = {

    "200001": '/pcmall/user/user_detail', // 用户详情
    "200002": '/pcmall/user/user_basic', // 用户基本信息
    "200003": '/pcmall/user/get_user_free_chance', // 用户免押额度
    "200004": '/pcmall/user/user_info', // 用户信息
    "200005": '/pcmall/user/get_related_users', // 公司列表
    "201006": '/pcmall/user/amend_name', // 修改昵称
    "200007": '/pcmall/auth/silent_send_code', // 验证手机号
    "201008": '/pcmall/user/change_phone', // 修改手机号
    "201009": '/pcmall/user/amend_avatar', // 修改头像



    "200010": '/pcmall/address/ua_list', // 收货地址
    "200011": '/pcmall/address/check_contact', // 紧急联系人
    "201012": '/pcmall/address/add_ua', // 添加地址
    "201013": '/pcmall/address/modify_ua', // 修改地址
    "201014": '/pcmall/address/delete_ua', // 删除地址
    "201015": '/pcmall/address/add_contact', // 添加联系人


    "400001": '/auth/check_status', // 是否可以进行企业认证
    "401002": '/ocr/idcard', // OCR
    "401003": '/company_loginer/valid_code', // 判断原法人验证码
    "400004": '/company_loginer/get_valid_code', // 获取原法人验证码
    "401005": '/company_loginer/update_auth_phone', // 更换法人
    "401006": '/company_loginer/change_company_admin', // 转让管理员
    "400007": '/company_loginer/check_personal_auth', //
    "401008": '/company_loginer/add_company_loginer', // 添加经办人
    "401009": '/company_loginer/delete_company_loginer', // 删除经办人
    "400010": '/auth/accredit_doc', // 运营授权证书
    "401011": '/auth/company', // 认证企业
    "401012": '/auth/person', // 认证个人
    "400013": '/auth/get_supplements', // 获取补充的资料
    "401014": '/auth/supplement', // 上传补充资料
    "400015": '/auth/is_provide_credit_picture', // 检查是否需要提供法人/经办人身份证正反面照片
    "400016": '/auth/detail', // 获取认证信息
    "400017": '/auth/check_company', //
    "401018": '/company_loginer/add_company_loginer_to_sales', // 添加经办人后，经办人分配公司所属的销售
    "401019": '/auth/init', // 获得法人扫脸链接
    "400020": '/auth/company_temp', // 临时存储公司信息
    "400021": '/auth/get_company_temp', // 获取临时存储的公司信息
    "401022": '/auth/company_zm', // 法人企业认证

    "701002": '/pcmall/auth/login', // 密码登录
    "701003": '/pcmall/user/auth_code_login', // 短信验证码登录
    "701004": '/pcmall/auth/reset_password', // 重置密码
    "701005": '/pcmall/auth/register', // 注册
    "701006": '/pcmall/user/switch_login_user', // 切换登录用户
    "700007": '/pcmall/user/check_token', // 检查登录是否过期
    "701008": '/pcmall/auth/modify_password', // 修改密码
    "700009": '/pcmall/auth/get_captcha', // 图片验证
    "700010": '/pcmall/auth/get_auth_code_by_type',  // 获取验证码
    "700011": '/pcmall/auth/silent_send_code',
    "701012": '/pcmall/user/valid_origin_phone', // 检验手机号
    "700013": '/pcmall/auth/get_auth_code', // 图形验证码
    "701014": '/dingtalk/bind_actual_phone', // 第三方绑定
    "701015": '/pcmall/auth/third_party_login', // 第三方登录
    "700016": '/cloud_contract/get_contract_list', // 合同
    "700017": '/pcmall/auth/getImage', //获取图形验证码
    "701118": '/pcmall/auth/matchImage', // 校验验证码
    "700019": '/pcmall/auth/get_phone_code', // 发送短信

    "701050": '/zmbc/get_biz_no', // 扫脸biz_no
    "700051": '/auth/check_face', // 检测扫脸
    "700052": '/auth/face_ability', // 检测下单能否直接扫脸
    "700053": '/auth/select_legal_person', // 下单补充法人身份
    "700054": '/auth/round_check_return', // 法人检测扫脸
};
