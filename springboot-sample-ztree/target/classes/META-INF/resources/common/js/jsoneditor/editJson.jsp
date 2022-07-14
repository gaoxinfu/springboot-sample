<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/jsp/taglib.jsp"%>
<%@ include file="/common/jsp/include.jsp"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">

    <!-- jsoneditor -->
    <link rel="stylesheet" type="text/css" href="${ctx}/common/js/jsoneditor/jsoneditor.css">
    <script type="text/javascript" src="${ctx}/common/js/jsoneditor/jsoneditor.js"></script>
    <script type="text/javascript" src="${ctx}/common/js/jsoneditor/json2.js"></script>
    <!-- ace code editor -->
    <script type="text/javascript" src="${ctx}/common/js/jsoneditor/lib/ace/ace.js"></script>
    <script type="text/javascript" src="${ctx}/common/js/jsoneditor/lib/ace/mode-json.js"></script>
    <script type="text/javascript" src="${ctx}/common/js/jsoneditor/lib/ace/theme-textmate.js"></script>
    <script type="text/javascript" src="${ctx}/common/js/jsoneditor/lib/ace/theme-jsoneditor.js"></script>

    <!-- json lint -->
    <script type="text/javascript" src="${ctx}/common/js/jsoneditor/lib/jsonlint/jsonlint.js"></script>

    <style type="text/css">
        body {
            font: 10.5pt arial;
            color: #4d4d4d;
            line-height: 150%;
            width: 95%;
        }

        code {
            background-color: #f5f5f5;
        }

        #jsoneditor {
            width: 100%;
            height: 600px;
        }
    </style>
</head>
<body>

<button id="getJSON">编辑完成</button>

  <button id="opengJSON">打开新编辑器</button>
   <button id="closeJSON">关闭页面</button>
 
<br><br>
 
<div id="jsoneditor"></div>

<script type="text/javascript" >

    var container = document.getElementById('jsoneditor');
    
    var options = {
        mode: 'text',
        modes: ['text', 'tree', 'view'],  
        error: function (err) {
            //alert(err.toString());
            alert(err.toString());
        }
    };
  
    var editor = new jsoneditor.JSONEditor(container, options);
     
    if(window.opener && window.opener.getContent()!=null && window.opener.getContent()!=''){
       editor.setText(window.opener.getContent());
    }
   
    document.getElementById('getJSON').onclick = function () {
         var json = editor.get();
         window.opener.setContent(JSON2.stringify(json));
         window.close();  
    }; 
    
   
    document.getElementById('opengJSON').onclick = function () {
         window.open("newJson.jsp?noLayout=true&random="+ Math.random()); 
    }; 
    
     document.getElementById('closeJSON').onclick = function () {
         window.close();  
    };
     
        
</script>
</body>
</html>
