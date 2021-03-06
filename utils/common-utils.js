global.close_or_open_modal_sign = async function(){
    console.log('close or open modal_sign')
    const modal_sign_can_click = await ele_can_click('modal-signin-close')
    if(!modal_sign_can_click) {
        await click('header-signin-out')
    } else await click('modal-signin-close')
}


global.signin_with_header_button = async function(type = 'private_key', ...data) {
    console.log('signin with header button:', type, data)
    const address_type = await executeScript('return getState().account.type')
    if(type === address_type) return
    let modal_sign_can_click = await ele_can_click('modal-signin-close')

    let count  = 5

    while((!modal_sign_can_click) && (count > 0)) {
        await click('header-signin-out')
        modal_sign_can_click = await ele_can_click('modal-signin-close')
        count--
        await driver.sleep(500)
    }

    if(!await ele_can_click('modal-signin-close')) throw 'can not open modal signin'

    if(type === 'private_key') {
        await click('modal-signin-private-key-button')
        await input('modal-signin-private-key-input', data[0])
        await click('modal-signin-private-key-signin')
    } else if (type === 'visitor') {
        await input('modal-signin-input-browse-address', data[0])
        await click('modal-signin-browse-button')
    }
}

global.signout_from_staking = async function() {
    console.log('signout from staking')
    await click('sidebar-menu-staking')
    let ele = ele_can_click('staking-copy-refresh-clear-button-group .clear-address')
    let count = 5
    while(!ele) {
        ele = ele_can_click('staking-copy-refresh-clear-button-group .clear-address')
        count--
        await driver.sleep(500)
    }
    if(ele) await click('staking-copy-refresh-clear-button-group .clear-address')
}

global.signout_from_account = async function() {
    console.log('signout from account')
    await click('sidebar-menu-account')
    const ele = ele_can_click('account-copy-refresh-clear-button-group .clear-address')
    if(ele) await click('account-copy-refresh-clear-button-group .clear-address')
}

global.get_num_from_1_to_n = function(n) {
    return Math.ceil(Math.random() * n)
}

global.get_num_from_0_to_less_n = function(n) {
    return Math.floor(Math.random() * n)
}

global.goto_dashboard = async function() {
    console.log('goto dashboard')
    await click('sidebar-menu-dashboard')
}

global.goto_account = async function() {
    console.log('goto account')
    await click('sidebar-menu-account')
}

global.goto_staking = async function() {
    console.log('goto staking')
    await click('sidebar-menu-staking')
}

const pool_detail_suffixs = ['0xa0ce1062d72bae67bce48509e1b196753d2a90655be1402c0069ecc0cd47210e', '', 'rgfwergferwgewrg']

global.skip_to_pool_detail = async function(){
    const url = `https://localhost:3000/pool/${ pool_detail_suffixs[get_num_from_0_to_less_n(pool_detail_suffixs.length)] }`
    console.log('goto pool detail:', url)
    await executeScript(`window.location = '${url}'`)
}

global.skip_to_console = async function() {
    console.log('goto console')
    await executeScript(`window.location = 'https://localhost:3000/staking/console'`)
}

const table_names = ['', 'pools', 'finalizations', 'delegations', 'Rewards & Auto-delegation', 'refgesrfgergf']

global.skip_to_staking = async function() {
    const url = `https://localhost:3000/staking/${table_names[get_num_from_0_to_less_n(table_names.length)]}`
    console.log('skip to staking:', url)
    await executeScript(`window.location = '${url}'`)
}

const dashboard_help_suffixs = ['', 'Staking Actions', 'Staking Pool', 'Account Page', 'regfersgse']


global.skip_to_dashboard = async function() {
    const url = `https://localhost:3000/dashboard/${dashboard_help_suffixs[get_num_from_0_to_less_n(dashboard_help_suffixs.length)]}`
    console.log('skip to dashboard:', url)
    await executeScript(`window.location = '${url}'`)
}


global.skip_to_account = async function() {
    await executeScript(`window.location = 'https://localhost:3000/account'`)
}

const menus = ['sidebar-menu-staking', 'sidebar-menu-account', 'sidebar-menu-dashboard']

global.test_menus = async function () {
    console.log('test menus')
    for(let i = 0;i < 15;i++) {
        await click(menus[get_num_from_0_to_less_n(3)])
    }
}

global.signout_from_header_button = async function() {
    console.log('signout from header button')
    const address = await executeScript('return getState().account.address')
    if(!address) return
    await close_or_open_modal_sign()
}

const pool_detial_buttons = ['pool-detail-delegate', 'pool-detail-undelegate', 'pool-detail-withdraw']

global.click_pool_detail_buttons_not_signin = async function() {
    console.log('click pool detail buttons not signin')
    for(let i = 0;i < 5;i++) {
        await click(pool_detial_buttons[get_num_from_0_to_less_n(pool_detial_buttons.length)])
        const ele = await ele_can_click('modal-signin-close')
        if(ele) await click('modal-signin-close')
        await click('pool-detail-back')
    }
}

global.click_pool_detail_buttons_private_key = async function() {
    console.log('click pool detail buttons with private key')
    for(let i = 0;i < 5;i++) {
        await click(pool_detial_buttons[get_num_from_0_to_less_n(pool_detial_buttons.length)])
        const ele = await ele_can_click('staking-console-back')
        if(ele) await click('staking-console-back')
        const ele2 = await ele_can_click('modal_staking_warning-cancel')
        if(ele2) await click('modal_staking_warning-cancel')
        await click('pool-detail-back')
    }
}

global.input_console = async function (amount) {
    console.log('input console:', amount)
    await input('staking-console-top-input', amount)
}

global.pop_submit_button = async function(){
    console.log('pop console transaction confirm modal')
    await click('staking-console-bottom-button')
}

global.submit_transaction = async function() {
    console.log('confirm transaction')
    const ele = await ele_can_click('modal-transaction-confirm-button')
    if(ele) await ele.click()
}

global.pool_detail_go_back = async function() {
    console.log('go back from pool detail')
    await click('pool-detail-back')
}

global.console_go_back = async function() {
    console.log('go back from console')
    await click('staking-console-back')
}

global.close_staking_warning_modal = async function(){
    console.log('close taking warning modal')
    const ele = await staking_warngin_modal_visible()
    if(ele) await click('modal_staking_warning-cancel')
}

global.staking_warngin_modal_visible = async function() {
    console.log('query if staking warning is visible')
    return await ele_can_click('modal_staking_warning-cancel')
}

global.pool_detail_delegate_button = async function(){
    console.log('get pool detail delegate button')
    await click('pool-detail-delegate')
    const ele = await staking_warngin_modal_visible()
    if(ele) {
        await ele.click()
        return false
    }
    return true
}

global.pool_detail_undelegate_button = async function(){
    console.log('get pool detail undelegate button')
    await click('pool-detail-undelegate')
    const ele = await staking_warngin_modal_visible()
    if(ele) {
        await ele.click()
        return false
    }
    return true
}

global.pool_detail_withdraw_button = async function(){
    console.log('get pool detail withdraw button')
    await click('pool-detail-withdraw')
    const ele = await staking_warngin_modal_visible()
    if(ele) {
        await ele.click()
        return false
    }
    return true
}


global.console_back_visible = async function() {
    console.log('query if console back button is visible')
    return await ele_can_click('staking-console-back')
}


global.get_delegations_len = async function() {
    let len = await executeScript('return Object.keys(getState().delegations).length')
    let count = 5
    while((!len) && (count > 0)) {
        len = await executeScript('return Object.keys(getState().delegations).length')
        count--
        await driver.sleep(2000)
    }
    console.log('get data delegations len:', len)
    return len
}


global.close_transaction_success_modal = async  function(count = 5){
    if(count < 1) return
    await driver.sleep(500)
    await close_staking_warning_modal()
    await close_transation_error()
    const ele = await ele_can_click('modal-transaction-success-back')
    console.log('try close transaction success modal:', !!ele)
    if(!ele) {
        return await close_transaction_success_modal(count - 1)
    }
    await ele.click()
}

global.close_transation_error = async function(){
    const ele = await ele_can_click('modal_transaction_error-close')
    if(ele) await ele.click()
    console.log('close transaction error modal')
}
global.click_console_pool_list = async function() {
    console.log('click console pool list select')
    await click('staking-console-bottom-pool-list')
}

global.click_console_to_pool_list = async function() {
    console.log('click console to pool list select')
    await click('staking-console-bottom-to-pool-list')
}

global.random_select_from_console_pool_list = async function() {
    console.log('select an pool from console pool list randomly')
    await click_console_pool_list()
    const list = await find_eles('staking-console-bottom-pool-list li')
    await (await find_ele(`staking-console-bottom-pool-list ul > li:nth-child(${get_num_from_1_to_n(list.length)})`)).click()
}

global.random_select_from_console_to_pool_list = async function() {
    console.log('select an pool from console to pool list randomly')
    await click_console_to_pool_list()
    const list = await find_eles('staking-console-bottom-to-pool-list li')
    await (await find_ele(`staking-console-bottom-to-pool-list ul > li:nth-child(${get_num_from_1_to_n(list.length)})`)).click()
}

global.click_console_top_full_amount = async function() {
    console.log('click console top full amount button')
    await click('console-top-full-amount')
}


async function signin_private_key(){
    await signin_with_header_button('private_key', 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff76a1592044a6e4f511265bca73a604d90b0529d1df602be30a19a9257660d1f5')
}
async function signin_visitor(){
    await signin_with_header_button('visitor', '0xa095541186b2e53698244e231274a0754678664d2655d0e233aa3b9a03d21ef4')
}


global.signin_private_key = signin_private_key

global.signin_visitor = signin_visitor
