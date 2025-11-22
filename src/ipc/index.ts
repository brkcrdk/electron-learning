/**
 * Tüm IPC handler'larını kaydeden merkezi dosya
 * Yeni handler'lar eklendiğinde buraya import edilip register edilmelidir.
 */
import { registerButtonHandlers } from './buttonHandlers';

export const registerAllHandlers = () => {
  // Tüm handler'ları burada kaydediyoruz
  registerButtonHandlers();

  // Yeni handler'lar eklendiğinde buraya ekleyin:
  // registerFileHandlers();
  // registerDatabaseHandlers();
  // vb.
};
