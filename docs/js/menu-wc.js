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
                                            'data-target="#controllers-links-module-ApiModule-c8faf7b961b59ac4f575b1f390acc336"' : 'data-target="#xs-controllers-links-module-ApiModule-c8faf7b961b59ac4f575b1f390acc336"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ApiModule-c8faf7b961b59ac4f575b1f390acc336"' :
                                            'id="xs-controllers-links-module-ApiModule-c8faf7b961b59ac4f575b1f390acc336"' }>
                                            <li class="link">
                                                <a href="controllers/ApiController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApiModule-c8faf7b961b59ac4f575b1f390acc336"' : 'data-target="#xs-injectables-links-module-ApiModule-c8faf7b961b59ac4f575b1f390acc336"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApiModule-c8faf7b961b59ac4f575b1f390acc336"' :
                                        'id="xs-injectables-links-module-ApiModule-c8faf7b961b59ac4f575b1f390acc336"' }>
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
                                <a href="modules/BlogModule.html" data-type="entity-link" >BlogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BlogModule-d35864a01eac6ef77f1075141e08f451"' : 'data-target="#xs-controllers-links-module-BlogModule-d35864a01eac6ef77f1075141e08f451"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BlogModule-d35864a01eac6ef77f1075141e08f451"' :
                                            'id="xs-controllers-links-module-BlogModule-d35864a01eac6ef77f1075141e08f451"' }>
                                            <li class="link">
                                                <a href="controllers/BlogController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BlogModule-d35864a01eac6ef77f1075141e08f451"' : 'data-target="#xs-injectables-links-module-BlogModule-d35864a01eac6ef77f1075141e08f451"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BlogModule-d35864a01eac6ef77f1075141e08f451"' :
                                        'id="xs-injectables-links-module-BlogModule-d35864a01eac6ef77f1075141e08f451"' }>
                                        <li class="link">
                                            <a href="injectables/BlogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogService</a>
                                        </li>
                                    </ul>
                                </li>
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
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoryModule-74ca6d83e27a0958cd5bce390c436661"' : 'data-target="#xs-controllers-links-module-CategoryModule-74ca6d83e27a0958cd5bce390c436661"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-74ca6d83e27a0958cd5bce390c436661"' :
                                            'id="xs-controllers-links-module-CategoryModule-74ca6d83e27a0958cd5bce390c436661"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-74ca6d83e27a0958cd5bce390c436661"' : 'data-target="#xs-injectables-links-module-CategoryModule-74ca6d83e27a0958cd5bce390c436661"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-74ca6d83e27a0958cd5bce390c436661"' :
                                        'id="xs-injectables-links-module-CategoryModule-74ca6d83e27a0958cd5bce390c436661"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChartModule.html" data-type="entity-link" >ChartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChartModule-5db8f7a281b4de6f476f42be092afbd9"' : 'data-target="#xs-components-links-module-ChartModule-5db8f7a281b4de6f476f42be092afbd9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChartModule-5db8f7a281b4de6f476f42be092afbd9"' :
                                            'id="xs-components-links-module-ChartModule-5db8f7a281b4de6f476f42be092afbd9"' }>
                                            <li class="link">
                                                <a href="components/ChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ChartModule-5db8f7a281b4de6f476f42be092afbd9"' : 'data-target="#xs-injectables-links-module-ChartModule-5db8f7a281b4de6f476f42be092afbd9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChartModule-5db8f7a281b4de6f476f42be092afbd9"' :
                                        'id="xs-injectables-links-module-ChartModule-5db8f7a281b4de6f476f42be092afbd9"' }>
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
                                            'data-target="#components-links-module-FormModule-46fb857a1967c57675340edc2dc8748f"' : 'data-target="#xs-components-links-module-FormModule-46fb857a1967c57675340edc2dc8748f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormModule-46fb857a1967c57675340edc2dc8748f"' :
                                            'id="xs-components-links-module-FormModule-46fb857a1967c57675340edc2dc8748f"' }>
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
                                            'data-target="#pipes-links-module-FormModule-46fb857a1967c57675340edc2dc8748f"' : 'data-target="#xs-pipes-links-module-FormModule-46fb857a1967c57675340edc2dc8748f"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-FormModule-46fb857a1967c57675340edc2dc8748f"' :
                                            'id="xs-pipes-links-module-FormModule-46fb857a1967c57675340edc2dc8748f"' }>
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
                                <a href="modules/OrganizationModule.html" data-type="entity-link" >OrganizationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OrganizationModule-187b44abc58a38095684ab933c4e7840"' : 'data-target="#xs-controllers-links-module-OrganizationModule-187b44abc58a38095684ab933c4e7840"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrganizationModule-187b44abc58a38095684ab933c4e7840"' :
                                            'id="xs-controllers-links-module-OrganizationModule-187b44abc58a38095684ab933c4e7840"' }>
                                            <li class="link">
                                                <a href="controllers/OrganizationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrganizationModule-187b44abc58a38095684ab933c4e7840"' : 'data-target="#xs-injectables-links-module-OrganizationModule-187b44abc58a38095684ab933c4e7840"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrganizationModule-187b44abc58a38095684ab933c4e7840"' :
                                        'id="xs-injectables-links-module-OrganizationModule-187b44abc58a38095684ab933c4e7840"' }>
                                        <li class="link">
                                            <a href="injectables/OrganizationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionModule.html" data-type="entity-link" >PermissionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PermissionModule-fe506f37f93013cfe53eb1c2c39aca23"' : 'data-target="#xs-controllers-links-module-PermissionModule-fe506f37f93013cfe53eb1c2c39aca23"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionModule-fe506f37f93013cfe53eb1c2c39aca23"' :
                                            'id="xs-controllers-links-module-PermissionModule-fe506f37f93013cfe53eb1c2c39aca23"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PermissionModule-fe506f37f93013cfe53eb1c2c39aca23"' : 'data-target="#xs-injectables-links-module-PermissionModule-fe506f37f93013cfe53eb1c2c39aca23"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionModule-fe506f37f93013cfe53eb1c2c39aca23"' :
                                        'id="xs-injectables-links-module-PermissionModule-fe506f37f93013cfe53eb1c2c39aca23"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PhotoModule.html" data-type="entity-link" >PhotoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PhotoModule-65a1d82b90b7ad2bf98353a9e40984e3"' : 'data-target="#xs-controllers-links-module-PhotoModule-65a1d82b90b7ad2bf98353a9e40984e3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PhotoModule-65a1d82b90b7ad2bf98353a9e40984e3"' :
                                            'id="xs-controllers-links-module-PhotoModule-65a1d82b90b7ad2bf98353a9e40984e3"' }>
                                            <li class="link">
                                                <a href="controllers/PhotoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhotoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PhotoModule-65a1d82b90b7ad2bf98353a9e40984e3"' : 'data-target="#xs-injectables-links-module-PhotoModule-65a1d82b90b7ad2bf98353a9e40984e3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PhotoModule-65a1d82b90b7ad2bf98353a9e40984e3"' :
                                        'id="xs-injectables-links-module-PhotoModule-65a1d82b90b7ad2bf98353a9e40984e3"' }>
                                        <li class="link">
                                            <a href="injectables/PhotoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhotoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductModule-4e3c6ca7435bb6809390b99e8157f689"' : 'data-target="#xs-controllers-links-module-ProductModule-4e3c6ca7435bb6809390b99e8157f689"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-4e3c6ca7435bb6809390b99e8157f689"' :
                                            'id="xs-controllers-links-module-ProductModule-4e3c6ca7435bb6809390b99e8157f689"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-4e3c6ca7435bb6809390b99e8157f689"' : 'data-target="#xs-injectables-links-module-ProductModule-4e3c6ca7435bb6809390b99e8157f689"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-4e3c6ca7435bb6809390b99e8157f689"' :
                                        'id="xs-injectables-links-module-ProductModule-4e3c6ca7435bb6809390b99e8157f689"' }>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProfileModule-19f366c3a3ef0eed15886c4340e58622"' : 'data-target="#xs-controllers-links-module-ProfileModule-19f366c3a3ef0eed15886c4340e58622"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfileModule-19f366c3a3ef0eed15886c4340e58622"' :
                                            'id="xs-controllers-links-module-ProfileModule-19f366c3a3ef0eed15886c4340e58622"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProfileModule-19f366c3a3ef0eed15886c4340e58622"' : 'data-target="#xs-injectables-links-module-ProfileModule-19f366c3a3ef0eed15886c4340e58622"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-19f366c3a3ef0eed15886c4340e58622"' :
                                        'id="xs-injectables-links-module-ProfileModule-19f366c3a3ef0eed15886c4340e58622"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectModule.html" data-type="entity-link" >ProjectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProjectModule-8d0c57cfb34a03d9136323bea22ab11e"' : 'data-target="#xs-controllers-links-module-ProjectModule-8d0c57cfb34a03d9136323bea22ab11e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProjectModule-8d0c57cfb34a03d9136323bea22ab11e"' :
                                            'id="xs-controllers-links-module-ProjectModule-8d0c57cfb34a03d9136323bea22ab11e"' }>
                                            <li class="link">
                                                <a href="controllers/ProjectController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProjectModule-8d0c57cfb34a03d9136323bea22ab11e"' : 'data-target="#xs-injectables-links-module-ProjectModule-8d0c57cfb34a03d9136323bea22ab11e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProjectModule-8d0c57cfb34a03d9136323bea22ab11e"' :
                                        'id="xs-injectables-links-module-ProjectModule-8d0c57cfb34a03d9136323bea22ab11e"' }>
                                        <li class="link">
                                            <a href="injectables/ProjectService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RoleModule-d3c54bc4dd6d36ef24b67b2e75f9dbe4"' : 'data-target="#xs-controllers-links-module-RoleModule-d3c54bc4dd6d36ef24b67b2e75f9dbe4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoleModule-d3c54bc4dd6d36ef24b67b2e75f9dbe4"' :
                                            'id="xs-controllers-links-module-RoleModule-d3c54bc4dd6d36ef24b67b2e75f9dbe4"' }>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoleModule-d3c54bc4dd6d36ef24b67b2e75f9dbe4"' : 'data-target="#xs-injectables-links-module-RoleModule-d3c54bc4dd6d36ef24b67b2e75f9dbe4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoleModule-d3c54bc4dd6d36ef24b67b2e75f9dbe4"' :
                                        'id="xs-injectables-links-module-RoleModule-d3c54bc4dd6d36ef24b67b2e75f9dbe4"' }>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SetAttributeModule.html" data-type="entity-link" >SetAttributeModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SetAttributeModule-8219d3205dc12421bdc12b1a7268470c"' : 'data-target="#xs-directives-links-module-SetAttributeModule-8219d3205dc12421bdc12b1a7268470c"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SetAttributeModule-8219d3205dc12421bdc12b1a7268470c"' :
                                        'id="xs-directives-links-module-SetAttributeModule-8219d3205dc12421bdc12b1a7268470c"' }>
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
                                <a href="modules/SprintModule.html" data-type="entity-link" >SprintModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SprintModule-7d8b5e4b4a213d493178886e152df96e"' : 'data-target="#xs-controllers-links-module-SprintModule-7d8b5e4b4a213d493178886e152df96e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SprintModule-7d8b5e4b4a213d493178886e152df96e"' :
                                            'id="xs-controllers-links-module-SprintModule-7d8b5e4b4a213d493178886e152df96e"' }>
                                            <li class="link">
                                                <a href="controllers/SprintController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SprintController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SprintModule-7d8b5e4b4a213d493178886e152df96e"' : 'data-target="#xs-injectables-links-module-SprintModule-7d8b5e4b4a213d493178886e152df96e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SprintModule-7d8b5e4b4a213d493178886e152df96e"' :
                                        'id="xs-injectables-links-module-SprintModule-7d8b5e4b4a213d493178886e152df96e"' }>
                                        <li class="link">
                                            <a href="injectables/SprintService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SprintService</a>
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
                                <a href="modules/TagModule.html" data-type="entity-link" >TagModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TagModule-4170e8aa691e1ec528852e156d9d2aa8"' : 'data-target="#xs-controllers-links-module-TagModule-4170e8aa691e1ec528852e156d9d2aa8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagModule-4170e8aa691e1ec528852e156d9d2aa8"' :
                                            'id="xs-controllers-links-module-TagModule-4170e8aa691e1ec528852e156d9d2aa8"' }>
                                            <li class="link">
                                                <a href="controllers/TagController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TagModule-4170e8aa691e1ec528852e156d9d2aa8"' : 'data-target="#xs-injectables-links-module-TagModule-4170e8aa691e1ec528852e156d9d2aa8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagModule-4170e8aa691e1ec528852e156d9d2aa8"' :
                                        'id="xs-injectables-links-module-TagModule-4170e8aa691e1ec528852e156d9d2aa8"' }>
                                        <li class="link">
                                            <a href="injectables/TagService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketModule.html" data-type="entity-link" >TicketModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TicketModule-a0c867bb076624566db80ce5d4bef233"' : 'data-target="#xs-controllers-links-module-TicketModule-a0c867bb076624566db80ce5d4bef233"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TicketModule-a0c867bb076624566db80ce5d4bef233"' :
                                            'id="xs-controllers-links-module-TicketModule-a0c867bb076624566db80ce5d4bef233"' }>
                                            <li class="link">
                                                <a href="controllers/TicketController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TicketModule-a0c867bb076624566db80ce5d4bef233"' : 'data-target="#xs-injectables-links-module-TicketModule-a0c867bb076624566db80ce5d4bef233"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TicketModule-a0c867bb076624566db80ce5d4bef233"' :
                                        'id="xs-injectables-links-module-TicketModule-a0c867bb076624566db80ce5d4bef233"' }>
                                        <li class="link">
                                            <a href="injectables/TicketService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketService</a>
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
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-5017a72907be4390c1e153004d33202d"' : 'data-target="#xs-controllers-links-module-UserModule-5017a72907be4390c1e153004d33202d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-5017a72907be4390c1e153004d33202d"' :
                                            'id="xs-controllers-links-module-UserModule-5017a72907be4390c1e153004d33202d"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-5017a72907be4390c1e153004d33202d"' : 'data-target="#xs-injectables-links-module-UserModule-5017a72907be4390c1e153004d33202d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-5017a72907be4390c1e153004d33202d"' :
                                        'id="xs-injectables-links-module-UserModule-5017a72907be4390c1e153004d33202d"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
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
                                <li class="link">
                                    <a href="controllers/BlogController.html" data-type="entity-link" >BlogController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoryController.html" data-type="entity-link" >CategoryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OrganizationController.html" data-type="entity-link" >OrganizationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionController.html" data-type="entity-link" >PermissionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PhotoController.html" data-type="entity-link" >PhotoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductController.html" data-type="entity-link" >ProductController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProfileController.html" data-type="entity-link" >ProfileController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProjectController.html" data-type="entity-link" >ProjectController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RoleController.html" data-type="entity-link" >RoleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SprintController.html" data-type="entity-link" >SprintController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TagController.html" data-type="entity-link" >TagController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TicketController.html" data-type="entity-link" >TicketController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
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
                                <a href="classes/Appliance.html" data-type="entity-link" >Appliance</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseDto.html" data-type="entity-link" >BaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseResourceService.html" data-type="entity-link" >BaseResourceService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Blog.html" data-type="entity-link" >Blog</a>
                            </li>
                            <li class="link">
                                <a href="classes/BlogContent.html" data-type="entity-link" >BlogContent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CarouselItem.html" data-type="entity-link" >CarouselItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/CarouselNavigation.html" data-type="entity-link" >CarouselNavigation</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateApplianceDto.html" data-type="entity-link" >CreateApplianceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBlogContentDto.html" data-type="entity-link" >CreateBlogContentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBlogDto.html" data-type="entity-link" >CreateBlogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrganizationDto.html" data-type="entity-link" >CreateOrganizationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePhotoDto.html" data-type="entity-link" >CreatePhotoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileDto.html" data-type="entity-link" >CreateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProjectDto.html" data-type="entity-link" >CreateProjectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSprintDto.html" data-type="entity-link" >CreateSprintDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTicketDto.html" data-type="entity-link" >CreateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
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
                            <li class="link">
                                <a href="classes/Organization.html" data-type="entity-link" >Organization</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/Photo.html" data-type="entity-link" >Photo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/Profile.html" data-type="entity-link" >Profile</a>
                            </li>
                            <li class="link">
                                <a href="classes/Project.html" data-type="entity-link" >Project</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Sprint.html" data-type="entity-link" >Sprint</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tag.html" data-type="entity-link" >Tag</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ticket.html" data-type="entity-link" >Ticket</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBlogContentDto.html" data-type="entity-link" >UpdateBlogContentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBlogDto.html" data-type="entity-link" >UpdateBlogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrganizationDto.html" data-type="entity-link" >UpdateOrganizationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePhotoDto.html" data-type="entity-link" >UpdatePhotoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileDto.html" data-type="entity-link" >UpdateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProjectDto.html" data-type="entity-link" >UpdateProjectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSprintDto.html" data-type="entity-link" >UpdateSprintDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTagDto.html" data-type="entity-link" >UpdateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTicketDto.html" data-type="entity-link" >UpdateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
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
                                    <a href="injectables/AuthMiddleware.html" data-type="entity-link" >AuthMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BlogService.html" data-type="entity-link" >BlogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarouselService.html" data-type="entity-link" >CarouselService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link" >CategoryService</a>
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
                                    <a href="injectables/OrganizationService.html" data-type="entity-link" >OrganizationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionService.html" data-type="entity-link" >PermissionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PhotoService.html" data-type="entity-link" >PhotoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link" >ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectService.html" data-type="entity-link" >ProjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleService.html" data-type="entity-link" >RoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SprintService.html" data-type="entity-link" >SprintService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TagService.html" data-type="entity-link" >TagService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TicketService.html" data-type="entity-link" >TicketService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypingService.html" data-type="entity-link" >TypingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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