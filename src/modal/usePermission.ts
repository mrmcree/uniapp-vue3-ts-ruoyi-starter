import {useUserStore} from '@/store';

const userStore = useUserStore()

/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkPermission(value = []) {
    if (!Array.isArray(value)) return false

    const permissions = userStore.Permissions
    const permissionDatas = value
    const all_permission = "*:*:*"

    return permissions.some(permission => {
        return all_permission === permission || permissionDatas.includes(permission)
    });

}

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkRole(value = []) {
    if (!Array.isArray(value)) return false
    const roles = userStore.Roles
    const permissionRoles = value
    const super_admin = "admin"

    return roles.some(role => {
        return super_admin === role || permissionRoles.includes(role)
    });


}
