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
                    <a href="index.html" data-type="index-link">client documentation</a>
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
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-2ab63eb2a0f31c8438200b61c13c240e"' : 'data-target="#xs-components-links-module-AppModule-2ab63eb2a0f31c8438200b61c13c240e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2ab63eb2a0f31c8438200b61c13c240e"' :
                                            'id="xs-components-links-module-AppModule-2ab63eb2a0f31c8438200b61c13c240e"' }>
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
                                <a href="modules/AuthdareMaterialModule.html" data-type="entity-link" >AuthdareMaterialModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthdareMaterialModule-1206cfa47abe6d80ae5cddad0d4f5b87"' : 'data-target="#xs-components-links-module-AuthdareMaterialModule-1206cfa47abe6d80ae5cddad0d4f5b87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthdareMaterialModule-1206cfa47abe6d80ae5cddad0d4f5b87"' :
                                            'id="xs-components-links-module-AuthdareMaterialModule-1206cfa47abe6d80ae5cddad0d4f5b87"' }>
                                            <li class="link">
                                                <a href="components/AuthdareMaterialComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthdareMaterialComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChartModule.html" data-type="entity-link" >ChartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChartModule-7b3044ea9a2caeeb291b51d14e2977b1"' : 'data-target="#xs-components-links-module-ChartModule-7b3044ea9a2caeeb291b51d14e2977b1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChartModule-7b3044ea9a2caeeb291b51d14e2977b1"' :
                                            'id="xs-components-links-module-ChartModule-7b3044ea9a2caeeb291b51d14e2977b1"' }>
                                            <li class="link">
                                                <a href="components/ChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DocModule.html" data-type="entity-link" >DocModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DocModule-347dfafe982fc36d2e0b1a9abba39218"' : 'data-target="#xs-components-links-module-DocModule-347dfafe982fc36d2e0b1a9abba39218"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DocModule-347dfafe982fc36d2e0b1a9abba39218"' :
                                            'id="xs-components-links-module-DocModule-347dfafe982fc36d2e0b1a9abba39218"' }>
                                            <li class="link">
                                                <a href="components/DocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormModule.html" data-type="entity-link" >FormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormModule-4fa6b395352e38b01178bc6e2be4d7b3"' : 'data-target="#xs-components-links-module-FormModule-4fa6b395352e38b01178bc6e2be4d7b3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormModule-4fa6b395352e38b01178bc6e2be4d7b3"' :
                                            'id="xs-components-links-module-FormModule-4fa6b395352e38b01178bc6e2be4d7b3"' }>
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
                                            'data-target="#pipes-links-module-FormModule-4fa6b395352e38b01178bc6e2be4d7b3"' : 'data-target="#xs-pipes-links-module-FormModule-4fa6b395352e38b01178bc6e2be4d7b3"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-FormModule-4fa6b395352e38b01178bc6e2be4d7b3"' :
                                            'id="xs-pipes-links-module-FormModule-4fa6b395352e38b01178bc6e2be4d7b3"' }>
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
                                <a href="modules/NavbarModule.html" data-type="entity-link" >NavbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NavbarModule-541dd1176ccfed63f393ded5646dc4dc"' : 'data-target="#xs-components-links-module-NavbarModule-541dd1176ccfed63f393ded5646dc4dc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavbarModule-541dd1176ccfed63f393ded5646dc4dc"' :
                                            'id="xs-components-links-module-NavbarModule-541dd1176ccfed63f393ded5646dc4dc"' }>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
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
                                            'data-target="#components-links-module-SidenavModule-9a4797773d73522d601859b09450c31d"' : 'data-target="#xs-components-links-module-SidenavModule-9a4797773d73522d601859b09450c31d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SidenavModule-9a4797773d73522d601859b09450c31d"' :
                                            'id="xs-components-links-module-SidenavModule-9a4797773d73522d601859b09450c31d"' }>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="classes/DefaultErrorStateMatcher.html" data-type="entity-link" >DefaultErrorStateMatcher</a>
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
                                    <a href="injectables/AuthdareMaterialService.html" data-type="entity-link" >AuthdareMaterialService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavbarService.html" data-type="entity-link" >NavbarService</a>
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
                                <a href="interfaces/FieldOptions.html" data-type="entity-link" >FieldOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormOptions.html" data-type="entity-link" >FormOptions</a>
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
                                <a href="interfaces/SidenavStoreState.html" data-type="entity-link" >SidenavStoreState</a>
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