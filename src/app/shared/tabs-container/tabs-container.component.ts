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
    if (!this.activeTabs() || this.activeTabs.length === 0) {
      this.selectTab(this.tabs!.first);
    }
  }

  activeTabs() {
    const activeTabs = this.tabs?.filter( (tab) => {
      return tab.active;
    });
    return activeTabs;
  }

  selectTab(tab: TabComponent, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    // TO ensure that there is only one active tab
    this.tabs?.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  appendClasses(tabIsActive: boolean) {
    const classesToBeAppended = {
      'hover:text-indigo-400': !tabIsActive,
      'hover:text-white text-white bg-indigo-400': tabIsActive
    }
    return classesToBeAppended;
  }
}
