package com.SamplePackage;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import io.github.bonigarcia.wdm.WebDriverManager;

public class ClassA {

	public static void main(String[] args) {
		WebDriverManager.chromedriver().setup();
		
		ChromeDriver driver=new ChromeDriver();
		driver.get("https://adactinhotelapp.com/");
		driver.findElement(By.id("username")).sendKeys("Francis3535");
		driver.findElement(By.id("password")).sendKeys("Francis@123");
		driver.findElement(By.id("login")).click();
		driver.manage().window().maximize();
		
		WebElement loc = driver.findElement(By.id("location"));

		Select s=new Select(loc);
		s.selectByVisibleText("Sydney");
		
		


	}

}
