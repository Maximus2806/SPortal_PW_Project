import { BaseModalPage } from '../baseModal.page.js';

export class DeleteModalPage extends BaseModalPage {

  uniqueElement: string;
  async clickActionButton() {    
    await this.click(this['Submit button']);
  }
  async clickCancel() {    
    await this.click(this['Cancel button'])
  }

  async clickCross() {    
    await this.click(this['Close modal button'])
  }
}
