export function addEventList (vm) {
    const eventList = { dom: [], com: [] }

    /** *************** 添加DOM事件 **********************/
        // 获取具有DOM事件的Vnode
    const VnodeListWithEvent = []
    function parseVnodehEvent (vnode, VnodeListWithEvent) {
        if (vnode.data && vnode.data.on && (!vnode.componentInstance)) {
            VnodeListWithEvent.push(vnode)
        }
        if (vnode.children) {
            vnode.children.map((vm, i) => {
                parseVnodehEvent(vm, VnodeListWithEvent)
            })
        }
    }
    parseVnodehEvent(vm._vnode, VnodeListWithEvent)

    VnodeListWithEvent.map((Vnode, i) => {
        const VnodeEvent = Vnode.data.on
        if (VnodeEvent) {
            const event = []

            for (const key in VnodeEvent) {
                const eventFullFnName = VnodeEvent[key].fns.name
                let eventFnName = ''
                if (eventFullFnName === key) {
                    //
                    if (vm.$options.methods) {
                        Object.keys(vm.$options.methods).map((m) => {
                            if (VnodeEvent[key].fns.toString().indexOf(m) > -1) {
                                eventFnName = m
                            }
                        })
                    }
                } else {
                    eventFnName = eventFullFnName.split(' ')[1]
                }
                // VnodeEvent[key].fns
                // if(!eventFnName){
                //     debugger
                // }

                event.push({
                    name: eventFnName,
                    type: 'on' + key,
                    fn: eventFnName ? vm[eventFnName] : VnodeEvent[key].fns
                })
            }

            eventList.dom.push({
                name: 'ele' + i,
                el: Vnode.elm,
                event: event,
                isShow: false
            })

            // debugger
        }
    })

    vm.$options.eventList = eventList

    /** *************** 添加组件事件 **********************/

        // if(vm.$options.name === "Container01"){
        //     debugger

    const ComEvent = vm.$options._parentListeners

    for (const key in ComEvent) {
        const eventFullFnName = ComEvent[key].fns.name
        let eventFnName = ''
        if (eventFullFnName === key) {
            //
            let $parent = vm.$parent
            while (!eventFnName) {
                if ($parent.$options.methods) {
                    Object.keys($parent.$options.methods).map((m) => {
                        if (ComEvent[key].fns.toString().indexOf(m) > -1) {
                            eventFnName = m
                        }
                    })
                }
                if (!$parent.$parent) {
                    break
                }
                $parent = $parent.$parent
            }
        } else {
            eventFnName = eventFullFnName.split(' ')[1]
        }

        eventList.com.push({
            name: eventFnName,
            el: vm.el,
            fn: eventFnName ? vm[eventFnName] : ComEvent[key].fns
        })
    }

    // }

    //
}