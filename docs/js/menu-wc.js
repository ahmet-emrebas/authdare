'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ngnest documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link" >ApiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ApiModule-103a9df0eec2aa2df853ef407cec2bb9"' : 'data-target="#xs-controllers-links-module-ApiModule-103a9df0eec2aa2df853ef407cec2bb9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ApiModule-103a9df0eec2aa2df853ef407cec2bb9"' :
                                            'id="xs-controllers-links-module-ApiModule-103a9df0eec2aa2df853ef407cec2bb9"' }>
                                            <li class="link">
                                                <a href="controllers/ApiController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApiModule-103a9df0eec2aa2df853ef407cec2bb9"' : 'data-target="#xs-injectables-links-module-ApiModule-103a9df0eec2aa2df853ef407cec2bb9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApiModule-103a9df0eec2aa2df853ef407cec2bb9"' :
                                        'id="xs-injectables-links-module-ApiModule-103a9df0eec2aa2df853ef407cec2bb9"' }>
                                        <li class="link">
                                            <a href="injectables/ApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-2584ddf875dde5567d771ee881e4e5d5"' : 'data-target="#xs-components-links-module-AppModule-2584ddf875dde5567d771ee881e4e5d5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2584ddf875dde5567d771ee881e4e5d5"' :
                                            'id="xs-components-links-module-AppModule-2584ddf875dde5567d771ee881e4e5d5"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CarouselModule.html" data-type="entity-link" >CarouselModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' : 'data-target="#xs-components-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' :
                                            'id="xs-components-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' }>
                                            <li class="link">
                                                <a href="components/CarouselComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarouselNavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselNavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarouselPersistentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselPersistentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' : 'data-target="#xs-injectables-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' :
                                        'id="xs-injectables-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' }>
                                        <li class="link">
                                            <a href="injectables/CarouselService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' : 'data-target="#xs-pipes-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' :
                                            'id="xs-pipes-links-module-CarouselModule-e7a904b7ea710f09d88ab339e45cf11f"' }>
                                            <li class="link">
                                                <a href="pipes/WrapPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WrapPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChartModule.html" data-type="entity-link" >ChartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChartModule-85e595da32dd35c8f64588e04fa2bc84"' : 'data-target="#xs-components-links-module-ChartModule-85e595da32dd35c8f64588e04fa2bc84"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChartModule-85e595da32dd35c8f64588e04fa2bc84"' :
                                            'id="xs-components-links-module-ChartModule-85e595da32dd35c8f64588e04fa2bc84"' }>
                                            <li class="link">
                                                <a href="components/ChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ChartModule-85e595da32dd35c8f64588e04fa2bc84"' : 'data-target="#xs-injectables-links-module-ChartModule-85e595da32dd35c8f64588e04fa2bc84"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChartModule-85e595da32dd35c8f64588e04fa2bc84"' :
                                        'id="xs-injectables-links-module-ChartModule-85e595da32dd35c8f64588e04fa2bc84"' }>
                                        <li class="link">
                                            <a href="injectables/ChartService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormModule.html" data-type="entity-link" >FormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormModule-8cf2e3ed34c688956c50bd1acc3377c1"' : 'data-target="#xs-components-links-module-FormModule-8cf2e3ed34c688956c50bd1acc3377c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormModule-8cf2e3ed34c688956c50bd1acc3377c1"' :
                                            'id="xs-components-links-module-FormModule-8cf2e3ed34c688956c50bd1acc3377c1"' }>
                                            <li class="link">
                                                <a href="components/DateFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FieldStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FieldStatusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextFieldComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-FormModule-8cf2e3ed34c688956c50bd1acc3377c1"' : 'data-target="#xs-pipes-links-module-FormModule-8cf2e3ed34c688956c50bd1acc3377c1"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-FormModule-8cf2e3ed34c688956c50bd1acc3377c1"' :
                                            'id="xs-pipes-links-module-FormModule-8cf2e3ed34c688956c50bd1acc3377c1"' }>
                                            <li class="link">
                                                <a href="pipes/ValidationErrorPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationErrorPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormStoreModule.html" data-type="entity-link" >FormStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GreetingModule.html" data-type="entity-link" >GreetingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GreetingModule-0e1bfd6343213e0d4f4dd7637990d989"' : 'data-target="#xs-components-links-module-GreetingModule-0e1bfd6343213e0d4f4dd7637990d989"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GreetingModule-0e1bfd6343213e0d4f4dd7637990d989"' :
                                            'id="xs-components-links-module-GreetingModule-0e1bfd6343213e0d4f4dd7637990d989"' }>
                                            <li class="link">
                                                <a href="components/GreetingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GreetingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InvoiceModule.html" data-type="entity-link" >InvoiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InvoiceModule-1e6d0031d2d901abdf13057e373a23ec"' : 'data-target="#xs-components-links-module-InvoiceModule-1e6d0031d2d901abdf13057e373a23ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InvoiceModule-1e6d0031d2d901abdf13057e373a23ec"' :
                                            'id="xs-components-links-module-InvoiceModule-1e6d0031d2d901abdf13057e373a23ec"' }>
                                            <li class="link">
                                                <a href="components/InvoiceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialDocModule.html" data-type="entity-link" >MaterialDocModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MaterialDocModule-cb51ec42f740d8c23d37d1cd4099bd3f"' : 'data-target="#xs-components-links-module-MaterialDocModule-cb51ec42f740d8c23d37d1cd4099bd3f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MaterialDocModule-cb51ec42f740d8c23d37d1cd4099bd3f"' :
                                            'id="xs-components-links-module-MaterialDocModule-cb51ec42f740d8c23d37d1cd4099bd3f"' }>
                                            <li class="link">
                                                <a href="components/CarouselDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselDocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartDocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormDocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvoiceDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceDocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MaterialDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaterialDocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarDocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QrcodeDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QrcodeDocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableDocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TypingDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TypingDocComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavbarModule.html" data-type="entity-link" >NavbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NavbarModule-783a2e321f2021cdcefd4710ae685b27"' : 'data-target="#xs-components-links-module-NavbarModule-783a2e321f2021cdcefd4710ae685b27"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavbarModule-783a2e321f2021cdcefd4710ae685b27"' :
                                            'id="xs-components-links-module-NavbarModule-783a2e321f2021cdcefd4710ae685b27"' }>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/QrcodeModule.html" data-type="entity-link" >QrcodeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-QrcodeModule-0d1ee71fefbdd69c588dec41e08730b4"' : 'data-target="#xs-components-links-module-QrcodeModule-0d1ee71fefbdd69c588dec41e08730b4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QrcodeModule-0d1ee71fefbdd69c588dec41e08730b4"' :
                                            'id="xs-components-links-module-QrcodeModule-0d1ee71fefbdd69c588dec41e08730b4"' }>
                                            <li class="link">
                                                <a href="components/QrcodeGenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QrcodeGenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QrcodeReaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QrcodeReaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SetAttributeModule.html" data-type="entity-link" >SetAttributeModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SetAttributeModule-1797add1d2d8b6de22ef13305ef56e25"' : 'data-target="#xs-directives-links-module-SetAttributeModule-1797add1d2d8b6de22ef13305ef56e25"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SetAttributeModule-1797add1d2d8b6de22ef13305ef56e25"' :
                                        'id="xs-directives-links-module-SetAttributeModule-1797add1d2d8b6de22ef13305ef56e25"' }>
                                        <li class="link">
                                            <a href="directives/SetAttributeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SetAttributeDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SidenavModule.html" data-type="entity-link" >SidenavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SidenavModule-5341cf7232a0408327d3e90ee1b869f2"' : 'data-target="#xs-components-links-module-SidenavModule-5341cf7232a0408327d3e90ee1b869f2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SidenavModule-5341cf7232a0408327d3e90ee1b869f2"' :
                                            'id="xs-components-links-module-SidenavModule-5341cf7232a0408327d3e90ee1b869f2"' }>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TableModule.html" data-type="entity-link" >TableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TableModule-fcebc62498bc92ce4a4e7125a2c17aec"' : 'data-target="#xs-components-links-module-TableModule-fcebc62498bc92ce4a4e7125a2c17aec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableModule-fcebc62498bc92ce4a4e7125a2c17aec"' :
                                            'id="xs-components-links-module-TableModule-fcebc62498bc92ce4a4e7125a2c17aec"' }>
                                            <li class="link">
                                                <a href="components/MenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-TableModule-fcebc62498bc92ce4a4e7125a2c17aec"' : 'data-target="#xs-pipes-links-module-TableModule-fcebc62498bc92ce4a4e7125a2c17aec"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-TableModule-fcebc62498bc92ce4a4e7125a2c17aec"' :
                                            'id="xs-pipes-links-module-TableModule-fcebc62498bc92ce4a4e7125a2c17aec"' }>
                                            <li class="link">
                                                <a href="pipes/ColumnNamePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColumnNamePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TypingModule.html" data-type="entity-link" >TypingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TypingModule-0220e5a73c8a0768280435658ace18ac"' : 'data-target="#xs-components-links-module-TypingModule-0220e5a73c8a0768280435658ace18ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TypingModule-0220e5a73c8a0768280435658ace18ac"' :
                                            'id="xs-components-links-module-TypingModule-0220e5a73c8a0768280435658ace18ac"' }>
                                            <li class="link">
                                                <a href="components/TypingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TypingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilsModule.html" data-type="entity-link" >UtilsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UtilsModule-ceab5a29c7f6761ef221fc4213895108"' : 'data-target="#xs-components-links-module-UtilsModule-ceab5a29c7f6761ef221fc4213895108"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UtilsModule-ceab5a29c7f6761ef221fc4213895108"' :
                                            'id="xs-components-links-module-UtilsModule-ceab5a29c7f6761ef221fc4213895108"' }>
                                            <li class="link">
                                                <a href="components/UtilsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-UtilsModule-ceab5a29c7f6761ef221fc4213895108"' : 'data-target="#xs-pipes-links-module-UtilsModule-ceab5a29c7f6761ef221fc4213895108"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-UtilsModule-ceab5a29c7f6761ef221fc4213895108"' :
                                            'id="xs-pipes-links-module-UtilsModule-ceab5a29c7f6761ef221fc4213895108"' }>
                                            <li class="link">
                                                <a href="pipes/AssetPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssetPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/ApiController.html" data-type="entity-link" >ApiController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CarouselItem.html" data-type="entity-link" >CarouselItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/CarouselNavigation.html" data-type="entity-link" >CarouselNavigation</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultErrorStateMatcher.html" data-type="entity-link" >DefaultErrorStateMatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/Form.html" data-type="entity-link" >Form</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormControlValidators.html" data-type="entity-link" >FormControlValidators</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormFieldOptions.html" data-type="entity-link" >FormFieldOptions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiService.html" data-type="entity-link" >ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarouselService.html" data-type="entity-link" >CarouselService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChartService.html" data-type="entity-link" >ChartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChartService-1.html" data-type="entity-link" >ChartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GreetingService.html" data-type="entity-link" >GreetingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvoiceService.html" data-type="entity-link" >InvoiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypingService.html" data-type="entity-link" >TypingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link" >UtilsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ChartState.html" data-type="entity-link" >ChartState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FieldOptions.html" data-type="entity-link" >FieldOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormOptions.html" data-type="entity-link" >FormOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormState.html" data-type="entity-link" >FormState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormStoreFormOutput.html" data-type="entity-link" >FormStoreFormOutput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormStoreState.html" data-type="entity-link" >FormStoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HTMLInputElementExtras.html" data-type="entity-link" >HTMLInputElementExtras</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Invoice.html" data-type="entity-link" >Invoice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavbarItem.html" data-type="entity-link" >NavbarItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PerformanceStat.html" data-type="entity-link" >PerformanceStat</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableItem.html" data-type="entity-link" >TableItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WordStat.html" data-type="entity-link" >WordStat</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});