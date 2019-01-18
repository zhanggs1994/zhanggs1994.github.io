---
layout: post
title: Map集合中value()方法、keySet()、entrySet()区别
date: 2018-08-22 10:42:55
categories: java
tags: map
---

* content
{:toc}

  在Map集合中

 **values():**方法是获取集合中的所有的值—-没有键，没有对应关系，

 **KeySet():**  
 将Map中所有的键存入到set集合中。因为set具备迭代器。所有可以迭代方式取出所有的键，再根据get方法。获取每一个键对应的值。 keySet():迭代后只能通过get()取key   

**entrySet()：**

 Set<Map.Entry<K,V>> entrySet() //返回此映射中包含的映射关系的 Set 视图。 Map.Entry表示映射关系。entrySet()：迭代后可以e.getKey()，e.getValue()取key和value。返回的是Entry接口 。
 
 
 
 



 **下面通过例子看看：**

 Map<String,String> map = new HashMap<String,String>();  
 map.put(“01”, “zhangsan”);  
 map.put(“02”, “lisi”);  
 map.put(“03”, “wangwu”);  

 Collection<String> collection = map.values();//返回值是个值的Collection集合  
 System.out.println(collection);  
 打印结果：  
 [zhangsan, lisi, wangwu]  


 Set<K> keySet() //返回值是个只存放key值的Set集合（集合中无序存放的）  

 Set<Map.Entry<K,V>> entrySet() //返回映射所包含的映射关系的Set集合（一个关系就是一个键-值对），就是把(key-value)作为一个整体一对一对地存放到Set集合当中的。  

 一. keySet()方式。  

 Map<String,String> map = new HashMap<String,String>();  

 map.put(“01”, “zhangsan”);  
 map.put(“02”, “lisi”);  
 map.put(“03”, “wangwu”);   

 Set<String> keySet = map.keySet();//先获取map集合的所有键的Set集合  

 Iterator<String> it = keySet.iterator();//有了Set集合，就可以获取其迭代器。  

 while(it.hasNext()){  
 String key = it.next();  
 String value = map.get(key);//有了键可以通过map集合的get方法获取其对应的值。  

 System.out.println(“key: “+key+”–>value: “+value);//获得key和value值  
 }  

 二. entrySet()方式：  
 Map<String,String> map = new HashMap<String,String>();  

 map.put(“01”, “zhangsan”);  
 map.put(“02”, “lisi”);  
 map.put(“03”, “wangwu”);  

 //通过entrySet()方法将map集合中的映射关系取出（这个关系就是Map.Entry类型）  
 Set<Map.Entry<String, String>> entrySet = map.entrySet();  

 //将关系集合entrySet进行迭代，存放到迭代器中   
 Iterator<Map.Entry<String, String>> it2 = entrySet.iterator();  

 while(it2.hasNext()){  
 Map.Entry<String, String> me = it2.next();//获取Map.Entry关系对象me  
 String key2 = me.getKey();//通过关系对象获取key  
 String value2 = me.getValue();//通过关系对象获取value  

 System.out.println(“key: “+key2+”–>value: “+value2);  
 }  

 虽然使用keyset及entryset来进行遍历能取得相同的结果  
 但两者的遍历速度是有差别的  

 keySet():迭代后只能通过get()取key   
 entrySet()：迭代后可以e.getKey()，e.getValue()取key和value。返回的是Entry接口   

 说明：keySet()的速度比entrySet()慢了很多，也就是keySet方式遍历Map的性能不如entrySet性能好  
 为了提高性能，以后多考虑用entrySet()方式来进行遍历。

 

   
