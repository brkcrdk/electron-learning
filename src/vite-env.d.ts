/// <reference types="vite/client" />

/**
 * typescript kurulumu sırasında yapılan değerlerin ts tarafından önerilmesi için
 * bu şekilde vite global configine eklenmesi gerekiyor.
 *
 * @see https://www.electronforge.io/config/plugins/webpack#main-process
 */
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;
