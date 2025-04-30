/**
 * エラーを破棄して安全に関数を実行する
 * @param {Function} callback
 * @param  {...any} params
 */
export async function safecall(callback, ...params) {
    try {
        await callback(params);
    } catch (error) {
        console.warn(error.stack);
    }
}