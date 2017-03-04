/* Show Date and Clock */
function set_datetimeclock(what, id) {
    var sekarang = new Date();
    var tanggal = sekarang.getDate();
    var hari = sekarang.getDay();
    if (hari === 0)
        hari = 'Minggu';
    if (hari === 1)
        hari = 'Senin';
    if (hari === 2)
        hari = 'Selasa';
    if (hari === 3)
        hari = 'Rabu';
    if (hari === 4)
        hari = 'Kamis';
    if (hari === 5)
        hari = 'Jumat';
    if (hari === 6)
        hari = 'Sabtu';
    var bulan = sekarang.getMonth();
    if (bulan === 0)
        bulan = 'Januari';
    if (bulan === 1)
        bulan = 'Februari';
    if (bulan === 2)
        bulan = 'Maret';
    if (bulan === 3)
        bulan = 'April';
    if (bulan === 4)
        bulan = 'Mei';
    if (bulan === 5)
        bulan = 'Juni';
    if (bulan === 6)
        bulan = 'Juli';
    if (bulan === 7)
        bulan = 'Agustus';
    if (bulan === 8)
        bulan = 'September';
    if (bulan === 9)
        bulan = 'Oktober';
    if (bulan === 10)
        bulan = 'November';
    if (bulan === 11)
        bulan = 'Desember';
    var tahun = sekarang.getFullYear();
    var detik = sekarang.getSeconds();
    if (detik < 10)
        detik = '0' + detik;
    var menit = sekarang.getMinutes();
    if (menit < 10)
        menit = '0' + menit;
    var jam = sekarang.getHours();
    if (jam < 10)
        jam = '0' + jam;
    if (what === '1') {
        var showdate = '' + hari + ', ' + tanggal + ' ' + bulan + ' ' + tahun + ' - ' + jam + ':' + menit + ':' + detik + '';
    } else if (what === '2') {
        var showdate = '' + hari + ', ' + tanggal + ' ' + bulan + '';
    } else if (what === '3') {
        var showdate = '' + jam + ':' + menit + ':' + detik + '';
    }

    document.getElementById(id).innerHTML = showdate;
    setTimeout('set_datetimeclock(\'' + what + '\', \'' + id + '\')', 1000);
}

function goToByScroll(id){
      // Remove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');
}


/* Warning Overlay */
function warning1(msg){
    new Messi('<table><tr><td width="80"><img src="img/icon/Status-dialog-information-icon.png" width="60"/></td><td>'+msg+'</td></tr></table>', {    
        title: 'Perhatian!', 
        modal: true, 
        buttons: [{id: 'btn_messi_1', label: 'TUTUP', val: 'X', class: 'button icon remove'}]
    });
    $('#btn_messi_1').focus();
}

function logout(){
    new Messi('<table><tr><td width="80"><img src="img/icon/Help-icon.png" width="60"/></td><td style="color:#000;">Apakah anda yakin ingin logout?</td></tr></table>', {
        title: 'Konfirmasi',
        modal: true,
        buttons: [{id: 0, label: 'YA', val: 'Y', class: 'button icon approve'}, {id: 1, label: 'TIDAK', val: 'N', class: 'button icon remove'}], 
        callback: function(val) { 
            if(val==='Y'){
                $.post("mod/exec/exec-logout.php",{},function(data)
                {
		     if(data=='sso'){
			killSSO();
		     }else{
			document.location = 'index.php';
		     }
		  });
            }
        }
    });
}

function open_url(url){
    $("#content-main-main").html('<div style="padding: 50px 0px 50px 0px; width:100%;" align="center"><img src="img/content/loading-bar.gif" width="20" style="margin-bottom:-3px;"/></div>');
    $("#content-main-main").load(url);
}

function open_detil(url,hs,div){
    //alert(url);
    hs_code= hs.replace('.', '');
    hs_l =hs_code.length;
    //alert(hs_l); return false;
    if(hs_l > 4){
        //alert(hs_code); return false;
        $("#"+div).html('<div style="padding: 50px 0px 50px 0px; width:100%;" align="center"><img src="img/content/loading-bar.gif" width="20" style="margin-bottom:-3px;"/></div>');
    $("#"+div).load(url);
    }else{
        return false;
    }
	
}


/*
function warning(msg){
$("body" ).append('<div id="compose-modal-warning" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">'+
					'<div class="modal-dialog modal-sm" style="width: 450px;">'+
						'<div class="modal-content">'+
							'<div class="modal-header" style="padding: 15px;height: 50px;background: red; color: white;">'+
								'<button type="button" onclick="close_modal(\'warning\')"  class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
								'<h4 class="modal-title" id="mySmallModalLabel">Admin INTR</h4>'+
							'</div>'+
							'<div class="modal-body">'+
								 '<div style="margin-top: 30px; margin-bottom: 11px; font-size: 16px;">'+msg+'</div>'+
							'</div>'+
							'<div class="modal-footer">'+
							'	<button type="button" onclick="close_modal(\'warning\')"  class="btn btn-success" data-dismiss="modal">TUTUP</button>'+
							'</div>'+
						'</div>'+
					'</div>'+
						'<a id="open_large_msg" data-toggle="modal" data-target="#compose-modal-warning"></a>'+
				'</div>');
$('#open_large_msg').click();    
}*/

function open_report(kd_ijin,ga,idx){
    //alert(idx);
    var id = kd_ijin + '-' + ga + '-' + idx;// + '-' + child + '-' + id_ga + '-' + reg_level;
	$.post('mod/exec/exec-filter-repository.php' + '?id=' + id, function(data) {
		//alert(data); return false;
		if (data != "") {
			//open_url('tpl/table/tbl-dtl-ga-child.php?id=' + data);
			 open_url('tpl/table/lst-services-child.php?id=' + data);
			//$("#"+div).load('tpl/table/tbl-dtl-ga-child.php?id=' + data);
		}else{
			var msg = 'Anda Belum Memilih Data';
			warning(msg);
		} 
	});
	return false;
	
}




function tips(id, msg){
    if ($('#tips_'+id+'').length > 0) {
        $("#tips_"+id).fadeOut('slow');
        $("#tips_"+id).remove();
        $('<span id="tips_'+id+'" class="tips"><span style="margin-right:-4px;"><img src="img/content/arrow-tips-red.gif"></span><span class="tips-inner">'+msg+'</span></span>').insertAfter("#"+id);
        $("#tips_"+id).fadeIn('slow');                
        
    }else{    
        $('<span id="tips_'+id+'" class="tips"><span style="margin-right:-4px;"><img src="img/content/arrow-tips-red.gif"></span><span class="tips-inner">'+msg+'</span></span>').insertAfter("#"+id);
        $("#tips_"+id).fadeIn('slow');
    }
}

function val_form(id, msg){
    if($('#'+id).val().length<1){
        $("#"+id).css('background', '#fcd0d0');
        return false;
    }else{
        $("#"+id).css('background', '#fff');
        return true;
    }    
}

function check_form(id, showTip){
    var check = "";
    var txt = "";
    $('#'+id+' *[mandatory="mandatory"]').each(function(){
        if($(this).is("select")){ //input select
            var msg = 'Anda Belum Memilih Data';
        }else{
            if($(this).attr('class')==='val_file'){
                var msg = 'Silahkan upload lampiran file';
            }else{
                var msg = 'Field Ini Harus Diisi';
            }
        }
        if($(this).val().length<1){
            check = check+"1";   
            txt = txt+'- '+$(this).attr('title')+'<br>';
        }
        if(showTip){
            val_form($(this).attr('id'), msg);
        }
    }); 
    if(check.length<1){
        return true;
    }else{
        return false;
    }
}

function loading(msg){
      new Messi('<div style="width: 100%; font-weight:bolder; color:#000;" align="center"><img src="img/content/loading-bar.gif" width="30"><br><br>'+msg+'</div>', {modal: true});    
}

function change_captcha(id){
    document.getElementById(id).src="mod/get/captcha.php?rnd="+Math.random();
}

/* Load URL Inside Element */
function load_open(id, url) {
    $("#" + id).html('<div style="width:100%; padding:20px 10px 10px 10px;" align="center"><img src="assets/img/content/ajax-loader.gif"/></div>');
    $("#" + id).load(url);
}

/* Search Popup */
function tabSrc(id, title, url, width){
      new Messi('<div style="height: 500px; max-height: 500px;" id="'+id+'-content"><div style="padding:40px;">Loading...</div></div>', {title: title, modal: true, width: width});
      $("#"+id+"-content").load(url);
}

/* Search Popup */
function previewFile(title, url, width){
      new Messi('<div style="height: 500px; max-height: 500px;"><iframe frameborder="0" width="990" height="500" src="'+url+'"/></div>', {title: title, modal: true, width: width});
}

function replaceAll(find, replace, str){
  return str.replace(new RegExp(find, 'g'), replace);
}

/* Table Classes */
function tableSelected(val, id, num){

    var active = $("#val_selected_num_"+id).val();
    //Reset
    if(parseInt(active)%2 === 0){
         $("#"+id+"_"+active).removeClass("selected");
         $("#"+id+"_"+active).addClass("even");
    }else{
         $("#"+id+"_"+active).removeClass("selected");        
    }
    //Set
    if(parseInt(num)%2 === 0){
        $("#"+id+"_"+num).removeClass("even");
        $("#"+id+"_"+num).addClass("selected");
    }else{
        $("#"+id+"_"+num).addClass("selected");
    }
    $("#val_selected_"+id).val(val);
    $("#val_selected_num_"+id).val(num);
}

function tableOrder(id, url, order, sorts){
    $(""+id+"-content").load(url+'&order='+order+'&sort='+sorts);
}

function tableNav(id, url, page){
    $(""+id+"-content").load(url+'&page='+page);    
}

function validEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/******************** Check Session ********************/
var session_timing;
function check_session(){
    stop_check_session();
    $.post("mod/get/session.php",{},function(data)
    {
        if(data==='0'){
            new Messi('<table><tr><td width="80"><img src="img/icon/Status-dialog-information-icon.png" width="60"/></td><td style="color:#000;">Session Anda Telah Kadaluarsa, Silahkan login kembali</td></tr></table>', {
                title: 'Perhatian',
                modal: true,
                buttons: [{id: '', label: 'OK', val: 'Y', class: 'button icon approve'}], 
                callback: function(val) { 
                    if(val==='Y'){
                        $.post("mod/exec/exec-logout.php",{},function(data)
                        {
                            document.location = 'index.php';
                        });
                    }
                }
            });
        }
    });
    session_timing = setTimeout('check_session()', 1200000);
}

function stop_check_session(){
        clearTimeout(session_timing);
        clearInterval(session_timing);
        session_timing = false;
}

function formatNumber(str) {
	var myVal = "";
	var myDec = "";
	var parts = str.toString().split(",");
	parts[0] = parts[0].replace(/[^0-9]/g,"");
	if ( ! parts[1] && str.indexOf(",") > 0 ) { myDec = "," }
	if ( parts[1] ) { 
		parts[1] = parts[1].replace(/[^0-9]/g,""); 
		myDec = ","+parts[1];
	}
	while ( parts[0].length > 3 ) {
		myVal = "."+parts[0].substr(parts[0].length-3, parts[0].length )+myVal;
		parts[0] = parts[0].substr(0, parts[0].length-3)
	}
	return parts[0]+myVal+myDec;
}
