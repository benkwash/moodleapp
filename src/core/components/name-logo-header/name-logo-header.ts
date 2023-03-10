// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CoreEventObserver, CoreEvents } from '@singletons/events';
import { CoreSites } from '@services/sites';

@Component({
    selector:'name-logo-header',
    templateUrl:'name-logo-header.html',
    styleUrls:['name-logo-header.scss'],
})
export class NameLogoHeaderComponent implements OnInit, OnDestroy{

   @Input() text = '';
   protected updateSiteObserver: CoreEventObserver;
   siteName='';

   constructor(){
       this.updateSiteObserver = CoreEvents.on(CoreEvents.SITE_UPDATED, () => {
           this.loadSiteName();
       }, CoreSites.getCurrentSiteId());
   }

   ngOnInit(): void {
       this.loadSiteName();
   }

   private loadSiteName(): void{
       this.siteName = CoreSites.getRequiredCurrentSite().getSiteName() || '';

   }

   ngOnDestroy(): void {
       this.updateSiteObserver?.off();
   }

}
