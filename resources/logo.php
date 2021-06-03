<?php 
set_time_limit(0);
$from = './';
$logo = 'icon.png';
$splash = 'splash.png';
$dossiers[]='./android/';
$dossiers[]='./ios/';
//$dossiers[]='../node_modules/cordova-android/bin/templates/project/res/';

foreach($dossiers as $dossier)
{
	//$dossier = '';
	if ($handle = opendir($dossier)) {
		
		/* Ceci est la façon correcte de traverser un dossier. */
		while (false !== ($entry = readdir($handle))) {
			if($entry=='.') continue;
			if($entry=='..') continue;
			$cfile = dirname($dossier).'/'.basename($dossier).'/'.$entry;
			if(is_dir($cfile))
			{
				if ($handle2 = opendir($cfile)) 
				{
					while (false !== ($sentry = readdir($handle2))) 
					{
						if($sentry=='.') continue;
						if($sentry=='..') continue;
						
						$scfile = dirname($cfile).'/'.basename($cfile).'/'.$sentry;
						

						$base = basename($sentry);
						$ext = strrchr($sentry,'.');
						
						if($ext!='.png') continue;
						$exp = explode('-',$base);
						
						if($exp[0]=='drawable') $base =  strrchr($base,'-');
						elseif($exp[0]=='icon' or substr($exp[0],0,4)=='icon') $base =  "-icon.png";
						elseif($exp[0]=='Default' or substr($exp[0],0,7)=='Default') $base =  "-screen.png";		
						echo $base." : <br>";
						switch($base)
						{
							case '-icon.png':
								//Copier le logo actuel là bas
								echo "Copy $dossier <b>$cfile</b> vers <b>$scfile</b>  |||||||||||||||||<br>"; //continue;
								$sizeF = getimagesize($logo); 
								$sizeT = getimagesize($scfile); 
							
								// Redimensionnement
								$image_p = imagecreatetruecolor($sizeT[0], $sizeT[1]);
								$image = imagecreatefrompng($logo);
								imagecolortransparent($image_p, imagecolorallocatealpha($image_p, 0, 0, 0, 127));
								imagealphablending($image_p, false);
								imagesavealpha($image_p, true);
								imagecopyresampled($image_p, $image, 0, 0, 0, 0, $sizeT[0], $sizeT[1], $sizeF[0], $sizeF[1]);
								
								imagepng($image_p,$scfile);

							
							break;
							case '-screen.png':
								//Modifier la sructure de screen
								 //Copier le logo actuel là bas
								$filefrom = $from.'splash/'.basename($scfile);
								$fileto  = $scfile;
								$sizeF = getimagesize($splash); 
								$sizeT = getimagesize($filefrom); 
								$E = $sizeF[1]/$sizeT[1];
								$sizeT[0] = $sizeT[0]*$E;
								$sizeT[1] = $sizeF[1];
								$X1 = ($sizeT[0]-$sizeF[0])/2;
								$X2 = $X1+$sizeF[0];
								$Y1 = 0;
								$Y2 = $sizeF[1];
								echo $sizeF[0]." & ".$sizeF[1]." / ";
								echo $sizeT[0]." & ".$sizeT[1]." $splash $E ($X1,$Y1) TO ($X2,$Y2)<br> $filefrom vers $fileto <br>";
								$E = $sizeF[1]/$sizeT[1];
							
								
								//créer une image temoin
								
								// Chargement
								//$echelle = 400;

								$image_p = imagecreatetruecolor($sizeT[0], $sizeT[1]);
								$image = imagecreatefrompng($splash);
								$color = imagecolorallocate($image_p, 255, 255, 255);
								imagefilledrectangle($image_p, 0, 0, $sizeT[0], $sizeT[1], $color);
								imagecopyresampled($image_p, $image, $X1, $Y1, 0, 0,  $sizeF[0], $sizeF[1], $sizeF[0], $sizeF[1]);
								imagepng($image_p,$fileto);

							break;
						}
						
						
					}

				}
			}
		}
	
		
	
		closedir($handle);
	}

}
?>
