---
layout: post
categories: springMVC
title: SpringMVC controller的几种返回方式
date: 2018-08-10 10:39:14
tags: Model ModelAndView Map View
---

* content
{:toc}

  SpringMVC 处理方法提供了以下几种返回方式：

 ModelAndView, Model, ModelMap, Map,View, String, void。



 
 

 ## 1、ModelAndView 

 处理方法返回值类型为modelAndView时，方法体即可通过该对象添加数据模型。该返回类型需要在方法结束的时候定义一个ModelAndView对象，并对Model和View分别进行设置。


```
   @RequestMapping(value="/index1",method=RequestMethod.GET)  
    public ModelAndView index(){  
        ModelAndView modelAndView = new ModelAndView("/user/index");  
        modelAndView.addObject("name", "xxx");  
        return modelAndView;  
    }  
    //对于ModelAndView构造函数可以指定返回页面的名称，也可以通过setViewName方法来设置所需要跳转的页面，使用addObject()设置需要返回的值。 
      
    @RequestMapping(value="/index2",method=RequestMethod.GET)  
    public ModelAndView index2(){  
        ModelAndView modelAndView = new ModelAndView();  
        modelAndView.addObject("name", "xxx");  
        modelAndView.setViewName("/user/index");  
        return modelAndView;  
    }  
    //返回的是一个包含模型和视图的ModelAndView对象；  
```
 ## 2.Map(Model/Model map)


```
      /** 
     * Model一个模型对象， 
     * 主要包含spring封装好的model和modelMap,以及java.util.Map， 
     * 当没有视图返回的时候视图名称将由requestToViewNameTranslator决定；  
     * @return 
     */  
    @RequestMapping(value="/index3",method=RequestMethod.GET)  
    public Map<String, String> index3(){  
        Map<String, String> map = new HashMap<String, String>();  
        map.put("1", "1");  
        //map.put相当于request.setAttribute方法  
        return map;  
    }  
    //响应的view应该也是该请求的view。等同于void返回。  
```
 这个对应的逻辑视图名是/index3，也就是请求url   
 在jsp页面中可直通过${key}获得到值, map.put()相当于request.setAttribute方法。

 ## 3.String

 （1）指定返回的视图名，模型数据可以通过 ModelMap 控制。 


```
    //通过model进行使用  
    @RequestMapping(value="/index4",method = RequestMethod.GET)  
    public String index(Model model) {  
        String retVal = "user/index";  
        User user = new User();  
        user.setName("XXX");  
        model.addAttribute("user", user);  
        return retVal;  
    }  
//返回字符串表示一个视图名称，这个时候如果需要在渲染视图的过程中需要模型的话，就可以给处理器添加一个模型参数，然后在方法体往模型添加值就可以了，
```
 注意：视图真实的访问路径URL= prefix前缀+视图名称 +suffix后缀组成。

 （2）方法结合@ResponseBody 注解

 如果方法声明了注解@ResponseBody ，则会直接将返回值输出到页面，方法通过配合@ResponseBody注解将内容或者对象作为HTTP响应正文返回给页面。


```
 @RequestMapping("/hello") 
@ResponseBody 
public String helloWorld() { 
return "Hello World"; 
} 
//上面的结果会将文本"Hello World "直接写到http响应流。
```
 （3）redirect 和forward

 返回视图前夹带 redirect 和forward 代表转发和重定向。


```
 //使用redirect进行重定向那么地址栏中的URL会发生变化，同时不会携带上一次的request
public String testController(Model model){

return "redirect:path";//path代表重定向的地址

}
//通过forward进行转发，地址栏中的URL不会发生改变，同时会将上一次的request携带到写一次请求中去

public String testController(Model model){

return "forward:path";//path代表转发的地址

}
```
 ## 4.void 

 如果返回值为空，则响应的视图页面对应为访问地址 。返回这种结果的时候可以在Controller方法的形参中定义HTTPServletRequest和HTTPServletResponse对象进行请求的接收和响应。


```
 @RequestMapping("/welcome") 
public void welcome() {} 

此例对应的逻辑视图名为"welcome"。 
//使用request转发页面
  request.getRequestDispatcher("转发路径").forward(request,response);
//使用response进行页面重定向
  response.sendRedirect("重定向路径");
//也可以使用response指定响应结果
  response.setCharacterEncoding("UTF-8");
  response.setContentType("application/json;charset=utf-8");
  response.getWriter.write("json串"); 
```




 注意：使用void,map,Model 时，没有指定视图，返回对应的逻辑视图名称就是请求url，视图url遵循：prefix前缀+视图名称 +suffix后缀组成。 

 _（以上内容来自自己学习笔记以及网上摘录整理，仅供学习与复习，侵删！）_

   
