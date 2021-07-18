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
                                            'data-target="#controllers-links-module-ApiModule-1f7528174a006d666ebf942ae1633dda"' : 'data-target="#xs-controllers-links-module-ApiModule-1f7528174a006d666ebf942ae1633dda"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ApiModule-1f7528174a006d666ebf942ae1633dda"' :
                                            'id="xs-controllers-links-module-ApiModule-1f7528174a006d666ebf942ae1633dda"' }>
                                            <li class="link">
                                                <a href="controllers/ApiController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApiModule-1f7528174a006d666ebf942ae1633dda"' : 'data-target="#xs-injectables-links-module-ApiModule-1f7528174a006d666ebf942ae1633dda"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApiModule-1f7528174a006d666ebf942ae1633dda"' :
                                        'id="xs-injectables-links-module-ApiModule-1f7528174a006d666ebf942ae1633dda"' }>
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
                                            'data-target="#components-links-module-AppModule-54dc60a73ce84153e4a00a2783b2e817"' : 'data-target="#xs-components-links-module-AppModule-54dc60a73ce84153e4a00a2783b2e817"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-54dc60a73ce84153e4a00a2783b2e817"' :
                                            'id="xs-components-links-module-AppModule-54dc60a73ce84153e4a00a2783b2e817"' }>
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
                                            'data-target="#components-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' : 'data-target="#xs-components-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' :
                                            'id="xs-components-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' }>
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
                                        'data-target="#injectables-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' : 'data-target="#xs-injectables-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' :
                                        'id="xs-injectables-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' }>
                                        <li class="link">
                                            <a href="injectables/CarouselService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' : 'data-target="#xs-pipes-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' :
                                            'id="xs-pipes-links-module-CarouselModule-d08521ab8cfb6650ece56784ed1c7b8d"' }>
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
                                            'data-target="#components-links-module-GreetingModule-5de0987dc59d61790569d03397049a8a"' : 'data-target="#xs-components-links-module-GreetingModule-5de0987dc59d61790569d03397049a8a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GreetingModule-5de0987dc59d61790569d03397049a8a"' :
                                            'id="xs-components-links-module-GreetingModule-5de0987dc59d61790569d03397049a8a"' }>
                                            <li class="link">
                                                <a href="components/GreetingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GreetingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialDocModule.html" data-type="entity-link" >MaterialDocModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MaterialDocModule-1bed14b0692b42d8cd9617ab2fa1d541"' : 'data-target="#xs-components-links-module-MaterialDocModule-1bed14b0692b42d8cd9617ab2fa1d541"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MaterialDocModule-1bed14b0692b42d8cd9617ab2fa1d541"' :
                                            'id="xs-components-links-module-MaterialDocModule-1bed14b0692b42d8cd9617ab2fa1d541"' }>
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
                                                <a href="components/MaterialDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaterialDocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarDocComponent</a>
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
                                            'data-target="#components-links-module-NavbarModule-f34d2ce58c6f05b6d00c5ebe72a877d2"' : 'data-target="#xs-components-links-module-NavbarModule-f34d2ce58c6f05b6d00c5ebe72a877d2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavbarModule-f34d2ce58c6f05b6d00c5ebe72a877d2"' :
                                            'id="xs-components-links-module-NavbarModule-f34d2ce58c6f05b6d00c5ebe72a877d2"' }>
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
                                            'data-target="#components-links-module-SidenavModule-881ef7a40ac5bcd22869fc8c20d372f2"' : 'data-target="#xs-components-links-module-SidenavModule-881ef7a40ac5bcd22869fc8c20d372f2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SidenavModule-881ef7a40ac5bcd22869fc8c20d372f2"' :
                                            'id="xs-components-links-module-SidenavModule-881ef7a40ac5bcd22869fc8c20d372f2"' }>
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
                                            'data-target="#components-links-module-TableModule-ff71a3a64e2b26be69d55ef7c8adf2cf"' : 'data-target="#xs-components-links-module-TableModule-ff71a3a64e2b26be69d55ef7c8adf2cf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableModule-ff71a3a64e2b26be69d55ef7c8adf2cf"' :
                                            'id="xs-components-links-module-TableModule-ff71a3a64e2b26be69d55ef7c8adf2cf"' }>
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
                                            'data-target="#pipes-links-module-TableModule-ff71a3a64e2b26be69d55ef7c8adf2cf"' : 'data-target="#xs-pipes-links-module-TableModule-ff71a3a64e2b26be69d55ef7c8adf2cf"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-TableModule-ff71a3a64e2b26be69d55ef7c8adf2cf"' :
                                            'id="xs-pipes-links-module-TableModule-ff71a3a64e2b26be69d55ef7c8adf2cf"' }>
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
                                            'data-target="#components-links-module-TypingModule-5e814e03e850a36d8ff1e6f4a5594052"' : 'data-target="#xs-components-links-module-TypingModule-5e814e03e850a36d8ff1e6f4a5594052"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TypingModule-5e814e03e850a36d8ff1e6f4a5594052"' :
                                            'id="xs-components-links-module-TypingModule-5e814e03e850a36d8ff1e6f4a5594052"' }>
                                            <li class="link">
                                                <a href="components/TypingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TypingComponent</a>
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
                                    <a href="injectables/TypingService.html" data-type="entity-link" >TypingService</a>
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