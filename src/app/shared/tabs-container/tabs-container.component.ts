import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss']
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs?: QueryList<TabComponent>;

  constructor() { }

  ngAfterContentInit(): void {
    if (!this.areThereAnyActiveTabs()) {
      this.selectTab(this.tabs!.first);
    }
  }

  areThereAnyActiveTabs() {
    const activeTabs = this.tabs?.filter( (tab) => {
      return tab.active;
    });
    return activeTabs;
  }

  selectTab(tab: TabComponent) {
    // TO ensure that there is only one active tab
    this.tabs?.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

}
