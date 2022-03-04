const interface = 'Tunnel0'

let convertedRoutesTemplateTextarea = document.querySelector('#convertedRoutesTemplate')

let routesWhitoutTrash = []

const specificsRouttes = [
    {
        address: '172.29.32.0 255.255.252.0',
        name: 'CPD_Camaragibe'
    },
    {
        address: '172.29.64.0 255.255.240.0',
        name: 'Porto_Digital_(Setic)'
    }
]

const routesBackupRouter = [
    'ip route 10.239.0.0 255.255.0.0 Tunnel0 name REDE_DE_ACESSO_VPN_1',
    'ip route 10.240.0.0 255.255.0.0 Tunnel0 name REDE_DE_ACESSO_VPN_2',
    'ip route 172.20.0.0 255.254.0.0 Tunnel0',
    'ip route 172.20.0.0 255.255.240.0 Tunnel0',
    'ip route 172.20.64.0 255.255.192.0 Tunnel0',
    'ip route 172.20.128.0 255.255.192.0 Tunnel0',
    'ip route 172.21.0.0 255.255.0.0 Tunnel0',
    'ip route 172.28.236.0 255.255.252.0 200.238.85.114',
    'ip route 172.29.32.0 255.255.252.0 Tunnel0 name CPD_Camaragibe',
    'ip route 172.29.64.0 255.255.240.0 Tunnel0 name Porto_Digital_(Setic)',
    'ip route 177.38.35.0 255.255.255.192 Tunnel0',
    'ip route 191.168.0.0 255.255.0.0 Tunnel0',
    'ip route 192.168.60.0 255.255.255.0 Tunnel0',
    'ip route 192.168.243.0 255.255.255.0 Tunnel0',
    'ip route 192.168.251.0 255.255.255.0 Tunnel0',
    'ip route 192.168.252.0 255.255.252.0 Tunnel0',
    'ip route 200.216.124.0 255.255.255.0 189.80.190.17 250',
    'ip route 200.222.75.0 255.255.255.0 189.80.190.17 250'
]

function clearingPartsOfTheRoute(route){
    const routeCleeared = route.substring(9)
    return routeCleeared
}

function removingRoutesTrash(route){
    route.map( routeIndex => {
        if(routeIndex.indexOf(interface) != -1){
            routesWhitoutTrash.push(clearingPartsOfTheRoute(routeIndex))
            return
        }
    })
}

let convertToFortigate = ''

const init = () => {
    removingRoutesTrash(routesBackupRouter)

    routesWhitoutTrash.forEach(route => {

        if(convertedRoutesTemplateTextarea.textContent == 0){
            convertedRoutesTemplateTextarea.textContent += `config router static\nedit 0\nset dst ${route.substring(route.indexOf(interface), -1)}\nset device VPN_IPSEC\nset comment "Rede_Remota"\nnext\n`
        } else{
            convertedRoutesTemplateTextarea.textContent += `edit 0\nset dst ${route.substring(route.indexOf(interface), -1)}\nset device VPN_IPSEC\nset comment "Rede_Remota"\nnext\n`
        }
    })    
}

init()