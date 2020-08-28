import React from "react";
import {WEEKDAYS, MONTHS} from "../../utils";

class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        
        // this.getDatesArray = this.getDatesArray.bind(this);
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        window.$(document).ready( () => {
            this.crear_select();
        })
    }

    isMobileDevice = ()=> {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    crear_select = () => {
        var li = new Array();
        var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
        var select_ = '';
        for (var e = 0; e < div_cont_select.length; e++) {
            div_cont_select[e].setAttribute('data-indx-select',e);
            div_cont_select[e].setAttribute('data-selec-open','false');
            var ul_cont = document.querySelectorAll("[data-indx-select='"+e+"'] > .cont_list_select_mate > ul");
            select_ = document.querySelectorAll("[data-indx-select='"+e+"'] >select")[0];
            if (this.isMobileDevice()) { 
                select_.addEventListener('change',  () => {
                    this._select_option(select_.selectedIndex, e);
                });
            }
            var select_optiones = select_.options;
            document.querySelectorAll("[data-indx-select='"+e+"']  > .selecionado_opcion ")[0].setAttribute('data-n-select',e);
            document.querySelectorAll("[data-indx-select='"+e+"']  > .icon_select_mate ")[0].setAttribute('data-n-select',e);
            for (var i = 0; i < select_optiones.length; i++) {
                li[i] = document.createElement('li');
                if (select_optiones[i].selected == true || select_.value == select_optiones[i].innerHTML ) {
                    li[i].className = 'active';
                    document.querySelector("[data-indx-select='"+e+"']  > .selecionado_opcion ").innerHTML = select_optiones[i].innerHTML;
                };
                li[i].setAttribute('data-index',i);
                li[i].setAttribute('data-selec-index',e);
                 
                li[i].addEventListener( 'click', (e) => {
                    var elt = e.target;
                    this._select_option(elt.getAttribute('data-index'), elt.getAttribute('data-selec-index')); 
                });
    
                li[i].innerHTML = select_optiones[i].innerHTML;
                ul_cont[0].appendChild(li[i]);
    
            };
        };
    }

    open_select =(event) => {
        var idx = event.target;
        var idx1 =  idx.getAttribute('data-n-select');
          var ul_cont_li = document.querySelectorAll("[data-indx-select='"+idx1+"'] .cont_select_int > li");
        var hg = 0;
        var slect_open = document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].getAttribute('data-selec-open');
        var slect_element_open = document.querySelectorAll("[data-indx-select='"+idx1+"'] select")[0];
         if (this.isMobileDevice()) { 
          if (window.document.createEvent) { // All
          var evt = window.document.createEvent("MouseEvents");
          evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            slect_element_open.dispatchEvent(evt);
        } else if (slect_element_open.fireEvent) { // IE
          slect_element_open.fireEvent("onmousedown");
        }else {
          slect_element_open.click();
        }
        }else {
        
          
          for (var i = 0; i < ul_cont_li.length; i++) {
        hg += ul_cont_li[i].offsetHeight;
        }; 
         if (slect_open == 'false') {  
         document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].setAttribute('data-selec-open','true');
         document.querySelectorAll("[data-indx-select='"+idx1+"'] > .cont_list_select_mate > ul")[0].style.height = hg+"px";
         document.querySelectorAll("[data-indx-select='"+idx1+"'] > .icon_select_mate")[0].style.transform = 'rotate(180deg)';
        }else{
         document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].setAttribute('data-selec-open','false');
         document.querySelectorAll("[data-indx-select='"+idx1+"'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
         document.querySelectorAll("[data-indx-select='"+idx1+"'] > .cont_list_select_mate > ul")[0].style.height = "0px";
         }
        }
        
    }

    salir_select = (indx) => {
        var select_ = document.querySelectorAll("[data-indx-select='"+indx+"'] > select")[0];
        document.querySelectorAll("[data-indx-select='"+indx+"'] > .cont_list_select_mate > ul")[0].style.height = "0px";
        document.querySelector("[data-indx-select='"+indx+"'] > .icon_select_mate").style.transform = 'rotate(0deg)';
        document.querySelectorAll("[data-indx-select='"+indx+"']")[0].setAttribute('data-selec-open','false');
    }

    _select_option = (indx,selc) => {
        if (this.isMobileDevice()) { 
       selc = selc -1;
       }
           var select_ = document.querySelectorAll("[data-indx-select='"+selc+"'] > select")[0];
       
         var li_s = document.querySelectorAll("[data-indx-select='"+selc+"'] .cont_select_int > li");
         var p_act = document.querySelectorAll("[data-indx-select='"+selc+"'] > .selecionado_opcion")[0].innerHTML = li_s[indx].innerHTML;
       var select_optiones = document.querySelectorAll("[data-indx-select='"+selc+"'] > select > option");
       for (var i = 0; i < li_s.length; i++) {
       if (li_s[i].className == 'active') {
       li_s[i].className = '';
       };
       li_s[indx].className = 'active';
       
       };
       select_optiones[indx].selected = true;
        select_.selectedIndex = indx;
        window.$(select_).change();
        this.salir_select(selc);
    }

    render() {

        return (
            <div className="select_mate" data-mate-select="active" >
                <select onClick={ ()=> false } >
                    <option value="">Seleciona una Opcion </option>
                    <option value="1">Select option 1</option>
                    <option value="2">Select option 2</option>
                    <option value="3">Select option 3</option>
                </select>
                <p className="selecionado_opcion"  onClick={this.open_select} ></p>
                <span onClick={this.open_select} className="icon_select_mate" >
                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
                        <path d="M0-.75h24v24H0z" fill="none"/>
                    </svg>
                </span>
                <div className="cont_list_select_mate">
                    <ul className="cont_select_int"></ul> 
                </div>
            </div>
        );
    }
}

export default CustomSelect;
