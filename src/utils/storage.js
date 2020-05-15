/* eslint-disable no-undef */
/**
 *  Storage
 */

function Storage(storage = sessionStorage) {
  /**
   * get
   */
  this.get = key => {
    const item = storage.getItem(key + "eAgent");
    try {
      return JSON.parse(item);
    } catch (error) {
      return item;
    }
  };

  /**
   * set
   */
  this.set = (key, value) =>
    storage.setItem(key + "eAgent", JSON.stringify(value));

  /**
   * remove
   */
  this.remove = key => storage.removeItem(key + "eAgent");

  /**
   * clear
   */
  this.clear = () => storage.clear();
}

export const Session = new Storage();
export const Application = new Storage(localStorage);

export default { Session, Application };
